# 粵韻道場 — Jyutping Dojo

A Jyutping (粵拼) learning game with Japanese-inspired aesthetics. Listen to Cantonese syllables and words, then identify their correct Jyutping romanization.

## 🎮 How to Play

1. **Listen** — Press the play button to hear a Cantonese syllable/word via browser TTS
2. **Choose** — Pick the correct Jyutping from four options
3. **Learn** — Review feedback with correct answers and hints after each question

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` `2` `3` `4` | Select answer 1–4 |
| `Space` / `R` | Replay audio |

## ❤️ HP (氣力) System

You start with **5 HP** (氣力). The HP mechanic balances challenge with forgiveness:

| Event | HP Change |
|-------|-----------|
| Wrong answer | **−1 HP** |
| Every 3 correct in a row | **+1 HP** (capped at 5) |
| HP reaches 0 | **Game Over** |

This means:
- You can afford up to 5 mistakes before game over
- Sustained correct streaks gradually heal you back
- The system rewards consistency, not just accuracy

## ⚡ Satori (悟) Mode

Get **3 correct answers in a row** to enter **Satori mode**:
- All points earned are multiplied by **×1.5**
- A golden glow appears on the question card
- One wrong answer breaks the satori state

## 📖 Game Modes

| Mode | Description |
|------|-------------|
| **聲母篇** (Initials) | Identify the initial consonant (b/p/m/f…) |
| **韻母篇** (Finals) | Identify the final/rime (aa/ai/au…) |
| **聲調篇** (Tones) | Identify the tone number (1–6) |
| **全能篇** (Full) | Identify the complete Jyutping syllable |
| **詞彙篇** (Words) | Identify Jyutping for common Cantonese words |
| **挑戰篇** (Challenge) | Timed mode — random question types, hard difficulty |

### Difficulty Levels

- **易 (Easy)** — Distractors differ significantly from the correct answer
- **難 (Hard)** — Distractors are minimally different (e.g., only tone or one phoneme apart)

## 🏅 Rank System

Your score determines your rank at game over:

| Score | Rank |
|-------|------|
| 0+ | 初心者 (Beginner) |
| 10+ | 見習生 (Apprentice) |
| 25+ | 修行者 (Practitioner) |
| 50+ | 有段者 (Adept) |
| 80+ | 達人 (Expert) |
| 120+ | 師範 (Master) |
| 200+ | 宗師 (Grand Master) |
| 350+ | 仙人 (Sage) |

## 🔊 Text-to-Speech

The game uses the **Web Speech API** with Cantonese (ISO 639-3: `yue`) voice synthesis. Voice selection priority:

1. `yue` / `yue-Hant-HK`
2. `zh-HK` / `zh-Hant-HK`
3. Any `zh` voice with "cantonese" in the name
4. Generic `zh` fallback

> **Note:** Voice availability depends on your OS and browser. macOS and iOS generally have good Cantonese TTS support. On systems without a Cantonese voice, the fallback may use Mandarin pronunciation.

## 🛠 Development

Built with **Vite** (vanilla JS, no framework). 

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
├── index.html              # Entry point
├── src/
│   ├── main.js             # Game controller
│   ├── data/
│   │   └── answerKeys.js   # Syllable & word banks, Jyutping tables
│   ├── modules/
│   │   ├── gameState.js    # HP, score, streak, rank logic
│   │   ├── questionGen.js  # Question & distractor generation
│   │   ├── renderer.js     # UI rendering & screen management
│   │   ├── tts.js          # Browser TTS (Cantonese)
│   │   └── sakura.js       # Cherry blossom particle effect
│   └── styles/
│       └── main.css        # Japanese aesthetics stylesheet
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── vite.config.js
└── package.json
```

## 🚀 Deployment

The app deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

### Setup

1. Go to **Settings → Pages** in your GitHub repo
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow will build and deploy automatically

The site will be available at:  
`https://<username>.github.io/Helen-zeze-web-app/`

## 📝 Adding New Syllables / Words

Edit [src/data/answerKeys.js](src/data/answerKeys.js):

**Add a syllable:**
```js
{ syllable: 'gaa1', initial: 'g', final: 'aa', tone: '1', hanzi: '家', meaning: 'home' },
```

**Add a word:**
```js
{ word: '你好', jyutping: 'nei5 hou2', syllables: ['nei5', 'hou2'], meaning: 'hello' },
```

The validation function will automatically check that `initial + final + tone === syllable` for each entry.

## License

ISC
