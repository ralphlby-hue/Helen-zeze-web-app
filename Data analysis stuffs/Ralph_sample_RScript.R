# QGSO Technical Task: Relational data validation pipeline
# Author: Dr. Ralph Fung

#install.packages("tidyverse")
library(writexl)
library(tidyverse)

# In a real task, these would be read from CSV files or other sources.
# Table A: Demographics
demo_table <- data.frame(
  id = c(101, 102, 103, 104, 105, 108, 101),
  age = c(25, 45, 130, 30, 17, 28, 25), # age in years
  gender = c("male", "M", "female", "fem", "non-binary", "male", "male"),
  region = c("Brisbane", "Townsville", "Cairns", "Brisbane", "Outback", "Macau", "Brisbane")
)
# Table B: Survey Responses
health_table <- data.frame(
  id = c(101, 102, 103, 104, 106, 108),
  height_cm = c(175, 160, 180, 170, 165, 178), # height in cm
  weight_kg = c(70, 85, 90, -5, 75, 80) # weight in kg
)
# Those with sharp eyes would likely notice something wrong with these data.
# Pre-linkage operations start here.
# Firstly, let's identify duplicates:
duplicates <- demo_table[duplicated(demo_table), ] # Put duplicates into a table on its own.
demo_table <- demo_table %>% distinct() # Duplicate removal
health_table <- health_table %>% distinct()
# Notes on duplicate removal: I could use more complex methods, but there isn't enough space.
orphans <- anti_join(health_table, demo_table, by = "id") # Identify 'orphan' records

# Defining 'Official' Queensland regions that are considered
qld_regions <- c("Brisbane", "Townsville", "Cairns", "Outback", "Gold Coast", "Sunshine Coast")

demo_table <- demo_table %>%
  mutate(
    # Validate and Convert Data Types
    age = as.numeric(age),
    
    # Standardise Gender Categories
    gender_std = case_when(
      tolower(str_trim(gender)) %in% c("m", "male")   ~ "Male",
      tolower(str_trim(gender)) %in% c("f", "female", "fem") ~ "Female",
      tolower(str_trim(gender)) %in% c("nonbinary", "non-binary") ~ "Non-binary",
      TRUE                               ~ "Other/Unknown"
    ),
    
    # Geographic Boundary Check, also using tolower if case sensitivity is a concern.
    is_qld = tolower(str_trim(region)) %in% tolower(qld_regions),
    region_audit = ifelse(!is_qld, paste("Out of Scope:", region), "Valid QLD")
  )

# Let's join and flag impossible values...
cleaned_master <- demo_table %>%
  inner_join(health_table, by = "id") %>%
  mutate(
    # Calculate BMI at the record level
    bmi = weight_kg / ((height_cm/100)^2),
    
    # COMPLEX LOGICAL VALIDATION (Business Rules)
    validity_flag = case_when(
      age < 0 | age > 115               ~ "Invalid Age",
      weight_kg <= 0                    ~ "Invalid Weight",
      age < 18 & age >= 0               ~ "Review: Minor", # Contextual flag
      is.na(bmi)                        ~ "Missing Measure",
      !is_qld                           ~ "Outside QLD Boundary",
      TRUE                              ~ "Clean"
    )
  )

# I would try to do a more thorough validation on height and weight, but there isn't enough space.
cleaned_master <- cleaned_master %>%
  mutate(
    valid_bmi_values = ifelse(validity_flag == "Clean", bmi, NA),
    # Calculate Z-scores using ONLY the mean and SD of valid cases
    bmi_z = (bmi - mean(valid_bmi_values, na.rm = TRUE)) / sd(valid_bmi_values, na.rm = TRUE),
    is_outlier = abs(bmi_z) > 3 # Final outlier flag (Standard 3 SD rule)
  ) %>%
  select(-valid_bmi_values) # Remove temporary helper column

quality_report <- cleaned_master %>%
  group_by(validity_flag) %>%
  summarise(count = n(), pct = (n()/nrow(cleaned_master))*100) # Print the quality report...

cat("Alert: Found", nrow(orphans), "records with no matching demographic data.\n")
cat("Alert: Found", nrow(duplicates), "records that were duplicates.\n")
cat("Final dataset: \n")
print(cleaned_master)
cat("Quality report: \n")
print(quality_report)
# Last note: this script focuses on data cleaning that can be applied to most forms of data. Depending on
# the kind of data on hand, I might also recommend (for example) checking for evidence of inattention or
# evaluating Cronbach's alphas.
write_xlsx(cleaned_master, "iris_data.xlsx")