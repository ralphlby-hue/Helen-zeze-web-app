// ==========================================
// Question Generator — Creates questions & distractors
// ==========================================

import { SyllableBank, WordBank, Initials, Finals, Tones } from '../data/answerKeys.js';

// Pick a random item from an array
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffle array (Fisher-Yates)
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate a question for a specific mode
export function generateQuestion(mode, difficulty) {
  switch (mode) {
    case 'initials': return generateInitialsQ(difficulty);
    case 'finals': return generateFinalsQ(difficulty);
    case 'tones': return generateTonesQ(difficulty);
    case 'full': return generateFullQ(difficulty);
    case 'words': return generateWordQ(difficulty);
    case 'challenge': return generateChallengeQ(difficulty);
    default: return generateFullQ(difficulty);
  }
}

// ----- Initials Mode -----
function generateInitialsQ(difficulty) {
  const correct = pick(SyllableBank);
  const correctAnswer = correct.initial || '(零聲母)';
  const distractors = new Set();

  if (difficulty === 'hard') {
    // Hard: similar-sounding initials
    const similarGroups = [
      ['b', 'p', 'm'], ['d', 't', 'n', 'l'], ['g', 'k', 'ng', 'h'],
      ['gw', 'kw', 'w'], ['z', 'c', 's', 'j'], ['f', 'h'],
    ];
    const group = similarGroups.find(g => g.includes(correct.initial)) || Initials;
    while (distractors.size < 3) {
      const d = pick(group);
      if (d !== correct.initial) distractors.add(d || '(零聲母)');
    }
  } else {
    while (distractors.size < 3) {
      const d = pick(Initials);
      if (d !== correct.initial) distractors.add(d || '(零聲母)');
    }
  }

  return {
    type: 'initials',
    prompt: '呢個音節嘅聲母係乜？',
    speakText: correct.hanzi,
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    hint: `${correct.hanzi} = ${correct.syllable}`,
    syllableInfo: correct,
  };
}

// ----- Finals Mode -----
function generateFinalsQ(difficulty) {
  const correct = pick(SyllableBank);
  const correctAnswer = correct.final;
  const distractors = new Set();

  if (difficulty === 'hard') {
    // Similar-sounding finals
    const similarGroups = [
      ['aa', 'a', 'ai', 'aai'], ['an', 'aan', 'ang', 'aang'],
      ['in', 'im', 'ing', 'ik'], ['un', 'ung', 'uk', 'ut'],
      ['oi', 'ou', 'o', 'on'], ['eoi', 'eon', 'eot', 'oe', 'oeng'],
      ['yu', 'yun', 'yut', 'ui'],
    ];
    const group = similarGroups.find(g => g.includes(correct.final)) ||
      Finals.filter(f => f.length === correct.final.length);
    while (distractors.size < 3) {
      const d = pick(group.length > 0 ? group : Finals);
      if (d !== correct.final) distractors.add(d);
    }
  } else {
    while (distractors.size < 3) {
      const d = pick(Finals);
      if (d !== correct.final) distractors.add(d);
    }
  }

  return {
    type: 'finals',
    prompt: '呢個音節嘅韻母係乜？',
    speakText: correct.hanzi,
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    hint: `${correct.hanzi} = ${correct.syllable}`,
    syllableInfo: correct,
  };
}

// ----- Tones Mode -----
function generateTonesQ(difficulty) {
  const correct = pick(SyllableBank);
  const toneNames = { '1': '第一聲 (高平)', '2': '第二聲 (高升)', '3': '第三聲 (高去)', '4': '第四聲 (低平)', '5': '第五聲 (低升)', '6': '第六聲 (低去)' };
  const correctAnswer = correct.tone;
  const distractors = new Set();

  if (difficulty === 'hard') {
    // Adjacent tones
    const adjacent = {
      '1': ['2', '3', '4'], '2': ['1', '5', '3'], '3': ['1', '6', '2'],
      '4': ['5', '6', '1'], '5': ['4', '2', '6'], '6': ['3', '4', '5']
    };
    const pool = adjacent[correct.tone] || Tones;
    while (distractors.size < 3) {
      const d = pick(pool);
      if (d !== correct.tone) distractors.add(d);
    }
  } else {
    while (distractors.size < 3) {
      const d = pick(Tones);
      if (d !== correct.tone) distractors.add(d);
    }
  }

  return {
    type: 'tones',
    prompt: '呢個音節係第幾聲？',
    speakText: correct.hanzi,
    correctAnswer,
    displayMap: Object.fromEntries(Tones.map(t => [t, toneNames[t]])),
    options: shuffle([correctAnswer, ...distractors]),
    hint: `${correct.hanzi} = ${correct.syllable} (${toneNames[correct.tone]})`,
    syllableInfo: correct,
  };
}

// ----- Full Syllable Mode -----
function generateFullQ(difficulty) {
  const correct = pick(SyllableBank);
  const correctAnswer = correct.syllable;
  const distractors = new Set();

  if (difficulty === 'hard') {
    // Change only one component
    while (distractors.size < 3) {
      const component = pick(['initial', 'final', 'tone']);
      let fake;
      if (component === 'initial') {
        const newInit = pick(Initials);
        fake = newInit + correct.final + correct.tone;
      } else if (component === 'final') {
        const newFinal = pick(Finals);
        fake = correct.initial + newFinal + correct.tone;
      } else {
        const newTone = pick(Tones);
        fake = correct.initial + correct.final + newTone;
      }
      if (fake !== correctAnswer) distractors.add(fake);
    }
  } else {
    while (distractors.size < 3) {
      const newInit = pick(Initials);
      const fake = newInit + correct.final + correct.tone;
      if (fake !== correctAnswer) distractors.add(fake);
    }
  }

  return {
    type: 'full',
    prompt: '呢個音節嘅粵拼係乜？',
    speakText: correct.hanzi,
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    hint: `${correct.hanzi} (${correct.meaning})`,
    syllableInfo: correct,
  };
}

// ----- Word Mode -----
function generateWordQ(difficulty) {
  const correct = pick(WordBank);
  const correctAnswer = correct.jyutping;
  const distractors = new Set();

  while (distractors.size < 3) {
    const fake = pick(WordBank);
    if (fake.jyutping !== correctAnswer) distractors.add(fake.jyutping);
  }

  return {
    type: 'words',
    prompt: `「${correct.word}」嘅粵拼係乜？`,
    speakText: correct.word,
    correctAnswer,
    options: shuffle([correctAnswer, ...distractors]),
    hint: `${correct.word} = ${correct.meaning}`,
    syllableInfo: { hanzi: correct.word, syllable: correct.jyutping, meaning: correct.meaning },
  };
}

// ----- Challenge Mode (random type each round) -----
function generateChallengeQ(difficulty) {
  const types = ['initials', 'finals', 'tones', 'full'];
  return generateQuestion(pick(types), 'hard');
}
