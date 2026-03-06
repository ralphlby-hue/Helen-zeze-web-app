import { setLanguage, applyTranslations, t, currentLang } from './modules/i18n.js';
// ==========================================
// 粵韻道場 — Main Game Controller
// ==========================================

import { validateSyllableBank } from './data/answerKeys.js';
import { SyllableBank } from './data/answerKeys.js';
import { initTTS, speakCantonese, getVoiceInfo } from './modules/tts.js';
import { generateQuestion } from './modules/questionGen.js';
import { createGameState, processAnswer, getAccuracy, getRank } from './modules/gameState.js';
import {
  showScreen, showPause, hidePause,
  updateHP, updateScore, updateRound, updateStreak,
  showSatori, updateModeBadge, renderQuestion, showFeedback,
  updatePauseStats, renderGameOver, screenShake,
  updateTimer, hideTimer, showHint, hideHint,
} from './modules/renderer.js';
import { initSakura } from './modules/sakura.js';

// ===== App State =====
let state = null;
let currentQuestion = null;
let timerInterval = null;
let isProcessing = false;

// ===== Init =====
async function init() {
  console.log('🎮 粵韻道場 initializing...');

  // Setup i18n
  applyTranslations();
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
      if (document.getElementById('screen-game').classList.contains('active')) {
        if (typeof window.renderCurrentQuestion === 'function') window.renderCurrentQuestion();
      }
    });
  }

  // Validate data
  validateSyllableBank(SyllableBank);

  // Init TTS
  await initTTS();
  console.log(`🔊 TTS Voice: ${getVoiceInfo()}`);

  // Init sakura
  initSakura('sakura-container');

  // Bind events
  bindEvents();

  // Show title
  showScreen('screen-title');
  console.log('✅ 粵韻道場 ready!');
}

// ===== Event Bindings =====
function bindEvents() {
  // Title screen
  document.getElementById('btn-start').addEventListener('click', () => showScreen('screen-mode'));
  document.getElementById('btn-how-to-play').addEventListener('click', () => showScreen('screen-howto'));
  document.getElementById('btn-back-title').addEventListener('click', () => showScreen('screen-title'));
  document.getElementById('btn-back-title2').addEventListener('click', () => showScreen('screen-title'));

  // Mode select
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  // Difficulty select
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Begin game
  document.getElementById('btn-begin').addEventListener('click', startGame);

  // Play audio button
  document.getElementById('btn-play-audio').addEventListener('click', playCurrentAudio);

  // Pause
  document.getElementById('btn-pause').addEventListener('click', pauseGame);
  document.getElementById('btn-resume').addEventListener('click', resumeGame);
  document.getElementById('btn-quit').addEventListener('click', quitGame);

  // Game over
  document.getElementById('btn-retry').addEventListener('click', () => {
    startGame();
  });
  document.getElementById('btn-home').addEventListener('click', () => {
    showScreen('screen-title');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
      const btns = document.querySelectorAll('.answer-btn:not(.disabled)');
      const idx = parseInt(e.key) - 1;
      if (btns[idx]) btns[idx].click();
    }
    if (e.key === ' ' || e.key === 'r') {
      e.preventDefault();
      playCurrentAudio();
    }
  });
}

// ===== Start Game =====
function startGame() {
  // Get selected mode
  const selectedMode = document.querySelector('.mode-btn.selected');
  const mode = selectedMode ? selectedMode.dataset.mode : 'full';

  // Get difficulty
  const selectedDiff = document.querySelector('.diff-btn.active');
  const difficulty = selectedDiff ? selectedDiff.dataset.diff : 'easy';

  // Create fresh state
  state = createGameState();
  state.mode = mode;
  state.difficulty = difficulty;

  // Switch to game screen
  showScreen('screen-game');
  updateModeBadge(mode);
  updateHP(state.hp, state.maxHp);
  updateScore(0);
  updateRound(1);
  updateStreak(0);

  // Challenge mode timer
  if (mode === 'challenge') {
    startTimer();
  } else {
    hideTimer();
  }

  // Load first question
  nextQuestion();
}

// ===== Next Question =====
function nextQuestion() {
  isProcessing = false;
  currentQuestion = generateQuestion(state.mode, state.difficulty);
  updateRound(state.round + 1);
  hideHint();

  renderQuestion(currentQuestion, handleAnswer);

  // Auto-play audio after a small delay
  setTimeout(() => playCurrentAudio(), 400);
}

// ===== Handle Answer =====
function handleAnswer(selectedAnswer) {
  if (isProcessing) return;
  isProcessing = true;

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const result = processAnswer(state, isCorrect, currentQuestion);

  // Visual feedback
  showFeedback(isCorrect, result, currentQuestion);
  updateScore(state.score);
  updateHP(state.hp, state.maxHp);
  updateStreak(state.streak);

  if (!isCorrect) {
    screenShake();
  }

  if (result.enteredSatori) {
    showSatori(true);
  } else if (result.leftSatori) {
    showSatori(false);
  }

  // Check game over
  if (result.gameOver) {
    setTimeout(() => {
      stopTimer();
      renderGameOver(state);
      showScreen('screen-gameover');
    }, 1500);
    return;
  }

  // Next question after delay
  setTimeout(() => {
    nextQuestion();
  }, isCorrect ? 1000 : 2000); // Longer delay on wrong to read feedback
}

// ===== Audio =====
function playCurrentAudio() {
  if (!currentQuestion) return;
  const btn = document.getElementById('btn-play-audio');
  btn.classList.add('playing');
  speakCantonese(currentQuestion.speakText)
    .catch(err => console.warn('TTS error:', err))
    .finally(() => btn.classList.remove('playing'));
}

// ===== Timer (Challenge Mode) =====
function startTimer() {
  state.timeLeft = state.maxTime;
  updateTimer(state.timeLeft, state.maxTime);

  timerInterval = setInterval(() => {
    state.timeLeft -= 0.1;
    updateTimer(state.timeLeft, state.maxTime);
    if (state.timeLeft <= 0) {
      stopTimer();
      state.hp = 0;
      renderGameOver(state);
      showScreen('screen-gameover');
    }
  }, 100);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ===== Pause/Resume =====
function pauseGame() {
  stopTimer();
  updatePauseStats(state);
  showPause();
}

function resumeGame() {
  hidePause();
  if (state.mode === 'challenge') {
    startTimer();
  }
}

function quitGame() {
  stopTimer();
  hidePause();
  showScreen('screen-title');
}

// ===== Launch =====
document.addEventListener('DOMContentLoaded', init);
