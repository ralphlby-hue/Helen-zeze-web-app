// ==========================================
// Game State — HP, Score, Streak, Rank System
// ==========================================

const MAX_HP = 5;
const SATORI_THRESHOLD = 3; // Streak needed for 悟 (satori) mode

// Rank tiers based on score
const RANKS = [
  { min: 0, rank: '初心者', en: 'Beginner' },
  { min: 10, rank: '見習生', en: 'Apprentice' },
  { min: 25, rank: '修行者', en: 'Practitioner' },
  { min: 50, rank: '有段者', en: 'Adept' },
  { min: 80, rank: '達人', en: 'Expert' },
  { min: 120, rank: '師範', en: 'Master' },
  { min: 200, rank: '宗師', en: 'Grand Master' },
  { min: 350, rank: '仙人', en: 'Sage' },
];

export function createGameState() {
  return {
    hp: MAX_HP,
    maxHp: MAX_HP,
    score: 0,
    streak: 0,
    bestStreak: 0,
    round: 0,
    correct: 0,
    total: 0,
    mode: 'full',
    difficulty: 'easy',
    inSatori: false, // 悟 mode (streak bonus)
    // Challenge mode timer
    timeLeft: 30,
    maxTime: 30,
    // Per-question tracking for breakdown
    history: [],
  };
}

export function getRank(score) {
  let r = RANKS[0];
  for (const tier of RANKS) {
    if (score >= tier.min) r = tier;
  }
  return r;
}

export function processAnswer(state, isCorrect, question) {
  state.total++;
  state.round++;

  const result = {
    isCorrect,
    scoreGained: 0,
    hpChange: 0,
    streakBroken: false,
    enteredSatori: false,
    leftSatori: false,
    gameOver: false,
  };

  if (isCorrect) {
    state.correct++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;

    // Base score
    let points = 10;

    // Satori (悟) bonus: streak >= threshold
    if (state.streak >= SATORI_THRESHOLD && !state.inSatori) {
      state.inSatori = true;
      result.enteredSatori = true;
    }
    if (state.inSatori) {
      points = Math.floor(points * 1.5); // 1.5x in satori
    }

    // Hard mode bonus
    if (state.difficulty === 'hard') {
      points = Math.floor(points * 1.3);
    }

    state.score += points;
    result.scoreGained = points;

    // HP recovery: every 3 correct answers, heal 1 HP
    if (state.streak % 3 === 0 && state.hp < state.maxHp) {
      state.hp = Math.min(state.hp + 1, state.maxHp);
      result.hpChange = 1;
    }

    // Challenge mode: gain time
    if (state.mode === 'challenge') {
      state.timeLeft = Math.min(state.timeLeft + 3, state.maxTime);
    }
  } else {
    // Wrong answer
    state.streak = 0;
    if (state.inSatori) {
      state.inSatori = false;
      result.leftSatori = true;
    }
    result.streakBroken = true;

    // Lose HP
    state.hp = Math.max(state.hp - 1, 0);
    result.hpChange = -1;

    // Check game over
    if (state.hp <= 0) {
      result.gameOver = true;
    }
  }

  // Record history
  state.history.push({
    round: state.round,
    question: question,
    isCorrect,
    scoreGained: result.scoreGained,
  });

  return result;
}

export function getAccuracy(state) {
  if (state.total === 0) return 0;
  return Math.round((state.correct / state.total) * 100);
}

export { MAX_HP, SATORI_THRESHOLD, RANKS };
