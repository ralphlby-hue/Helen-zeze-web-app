export function generateFakeAnswers(correctItem, Initials, Finals, Tones) {
    const distractors = new Set();
    const { start: correctStart, final, tone } = correctItem;
    //console.log("正確答案係:", correctItem);

    while (distractors.size < 3) {
        // 1. 喺聲母表隨機揀一個
        let randomStart = Initials[Math.floor(Math.random() * Initials.length)];
        let fakeFinal = correctItem.final; // 韻母保持不變
        let fakeTone = correctItem.tone; // 聲調保持不變

        // 2. 確保新聲母同正確答案唔同
        if (randomStart !== correctStart) {
            // 3. 砌埋一齊：新聲母 + 原有韻母 + 原有聲調
            const fakeSyllable = randomStart + fakeFinal + fakeTone;
            distractors.add(fakeSyllable);
        }
    }

    return Array.from(distractors);
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
