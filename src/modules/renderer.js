// ==========================================
// UI Renderer — Manages all screen transitions and DOM updates
// ==========================================

import { MAX_HP, SATORI_THRESHOLD, getRank, getAccuracy } from './gameState.js';

// ===== Screen Management =====
const screens = ['screen-title', 'screen-howto', 'screen-mode', 'screen-game', 'screen-gameover'];

export function showScreen(screenId) {
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('active', id === screenId);
    }
  });
  // Hide pause overlay
  const pause = document.getElementById('screen-pause');
  if (pause) pause.style.display = 'none';
}

export function showPause() {
  document.getElementById('screen-pause').style.display = 'flex';
}

export function hidePause() {
  document.getElementById('screen-pause').style.display = 'none';
}

// ===== HUD Updates =====
export function updateHP(hp, maxHp) {
  const fill = document.getElementById('hp-fill');
  const text = document.getElementById('hp-text');
  const pct = (hp / maxHp) * 100;
  fill.style.width = `${pct}%`;
  text.textContent = `${hp}/${maxHp}`;

  // Color changes
  fill.classList.remove('hp-high', 'hp-mid', 'hp-low', 'hp-critical');
  if (pct > 60) fill.classList.add('hp-high');
  else if (pct > 40) fill.classList.add('hp-mid');
  else if (pct > 20) fill.classList.add('hp-low');
  else fill.classList.add('hp-critical');
}

export function updateScore(score) {
  const el = document.getElementById('score-value');
  el.textContent = score;
  // Pop animation
  el.classList.remove('score-pop');
  void el.offsetWidth; // reflow
  el.classList.add('score-pop');
}

export function updateRound(round) {
  document.getElementById('round-num').textContent = round;
}

export function updateStreak(streak) {
  const display = document.getElementById('streak-display');
  const count = document.getElementById('streak-count');
  if (streak >= 2) {
    display.style.display = 'flex';
    count.textContent = streak;
  } else {
    display.style.display = 'none';
  }
}

export function showSatori(entering) {
  const card = document.getElementById('question-card');
  if (entering) {
    card.classList.add('satori-mode');
    // Flash effect
    const flash = document.createElement('div');
    flash.className = 'satori-flash';
    flash.textContent = '悟';
    card.appendChild(flash);
    setTimeout(() => flash.remove(), 1500);
  } else {
    card.classList.remove('satori-mode');
  }
}

export function updateModeBadge(mode) {
  const badge = document.getElementById('mode-badge');
  const fallbackNames = {
    initials: '聲母篇', finals: '韻母篇', tones: '聲調篇',
    full: '全能篇', words: '詞彙篇', challenge: '挑戰篇'
  };
  const modeKey = 'mode.' + mode;
  badge.textContent = window.i18nT ? window.i18nT(modeKey) || fallbackNames[mode] || mode : fallbackNames[mode] || mode;
}

// ===== Question / Answers Rendering =====
export function renderQuestion(question, onAnswer) {
  const grid = document.getElementById('answers-grid');
  const feedback = document.getElementById('feedback-area');
  grid.innerHTML = '';
  feedback.style.display = 'none';

  // Update prompt
  const prompt = document.querySelector('.question-prompt');
  if (prompt) prompt.textContent = question.prompt;

  question.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.dataset.answer = option;

    // Display text
    let displayText = option;
    if (question.displayMap && question.displayMap[option]) {
      displayText = question.displayMap[option];
    }
    btn.innerHTML = `<span class="answer-text">${displayText}</span>`;

    // Staggered entrance animation
    btn.style.animationDelay = `${i * 0.08}s`;

    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      // Disable all buttons
      grid.querySelectorAll('.answer-btn').forEach(b => b.classList.add('disabled'));
      onAnswer(option);
    });

    grid.appendChild(btn);
  });
}

export function showFeedback(isCorrect, result, question) {
  const grid = document.getElementById('answers-grid');
  const feedbackArea = document.getElementById('feedback-area');
  const feedbackContent = document.getElementById('feedback-content');

  // Highlight correct/wrong
  grid.querySelectorAll('.answer-btn').forEach(btn => {
    const ans = btn.dataset.answer;
    if (ans === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (!isCorrect && btn.classList.contains('disabled') && ans !== question.correctAnswer) {
      // Mark the clicked wrong one
    }
  });

  feedbackArea.style.display = 'block';

  if (isCorrect) {
    const encouragements = window.i18nLang && window.i18nLang() === 'ja' ? ['正解！', 'すごい！', 'よくできた！'] : window.i18nLang && window.i18nLang().startsWith('en') ? ['Correct!', 'Great!', 'Awesome!'] : window.i18nLang && window.i18nLang() === 'zh-CN' ? ['正确！', '好样的！', '答对了！', '厉害！'] : ['正確！', '好嘢！', '叻仔！', '答啱咗！', '犀利！', '得咗！'];
    const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
    const healText = window.i18nT ? window.i18nT('feedback.heal') || '回氣' : '回氣';
    const satoriText = window.i18nT ? window.i18nT('feedback.satorienter') || '進入「悟」之境界！得分 ×1.5' : '進入「悟」之境界！得分 ×1.5';
    
    const hpHtml = result.hpChange > 0 ? `<div class="feedback-heal">❤️ ${healText} +1</div>` : '';
    const satoriHtml = result.enteredSatori ? `<div class="feedback-satori">⚡ ${satoriText}</div>` : '';

    feedbackContent.innerHTML = `
      <div class="feedback-correct">
        <div class="feedback-emoji">✨</div>
        <div class="feedback-text">${msg}</div>
        <div class="feedback-points">+${result.scoreGained}</div>
        ${hpHtml}
        ${satoriHtml}
      </div>
    `;
  } else {
    const msg = window.i18nLang && window.i18nLang() === 'ja' ? '不正解...' : window.i18nLang && window.i18nLang().startsWith('en') ? 'Incorrect...' : window.i18nLang && window.i18nLang() === 'zh-CN' ? '答错了...' : '答錯咗...';
    const correctAnsLabel = window.i18nT ? window.i18nT('feedback.correctanswer') || '正確答案：' : '正確答案：';
    const satoriLostText = window.i18nT ? window.i18nT('feedback.satorilost') || '「悟」之境界已消散' : '「悟」之境界已消散';
    const satoriLostHtml = result.leftSatori ? `<div class="feedback-satori-lost">${satoriLostText}</div>` : '';
    
    feedbackContent.innerHTML = `
      <div class="feedback-wrong">
        <div class="feedback-emoji">💔</div>
        <div class="feedback-text">${msg}</div>
        <div class="feedback-answer">${correctAnsLabel}<strong>${question.correctAnswer}</strong></div>
        <div class="feedback-hint">${question.hint || ''}</div>
        ${satoriLostHtml}
      </div>
    `;
  }
}

// ===== Hint Display =====
export function showHint(text) {
  const area = document.getElementById('hint-area');
  area.style.display = 'block';
  area.textContent = text;
}

export function hideHint() {
  const area = document.getElementById('hint-area');
  area.style.display = 'none';
}

// ===== Timer (Challenge Mode) =====
export function updateTimer(timeLeft, maxTime) {
  const container = document.getElementById('timer-bar-container');
  const fill = document.getElementById('timer-fill');
  container.style.display = 'block';
  const pct = (timeLeft / maxTime) * 100;
  fill.style.width = `${pct}%`;

  fill.classList.remove('timer-safe', 'timer-warn', 'timer-danger');
  if (pct > 50) fill.classList.add('timer-safe');
  else if (pct > 25) fill.classList.add('timer-warn');
  else fill.classList.add('timer-danger');
}

export function hideTimer() {
  document.getElementById('timer-bar-container').style.display = 'none';
}

// ===== Pause Screen =====
export function updatePauseStats(state) {
  document.getElementById('pause-score').textContent = state.score;
  document.getElementById('pause-accuracy').textContent = `${getAccuracy(state)}%`;
}

// ===== Game Over Screen =====
export function renderGameOver(state) {
  const rankObj = getRank(state.score);
  let rankDisplay = rankObj.rank;
  const langKey = window.i18nLang ? window.i18nLang() : 'zh';
  if (langKey.startsWith('en') && rankObj.en) rankDisplay = rankObj.en;
  
  document.getElementById('go-rank').textContent = rankDisplay;
  document.getElementById('go-score').textContent = state.score;
  document.getElementById('go-correct').textContent = state.correct;
  document.getElementById('go-total').textContent = state.total;
  document.getElementById('go-best-streak').textContent = state.bestStreak;

  // Mini breakdown of mistakes
  const breakdown = document.getElementById('go-breakdown');
  const mistakes = state.history.filter(h => !h.isCorrect);
  
  const mistakeTitle = window.i18nT ? window.i18nT('gameover.mistakes') || '錯題回顧' : '錯題回顧';
  const perfectText = window.i18nT ? window.i18nT('gameover.perfect') || '✨ 全對！完美修行！' : '✨ 全對！完美修行！';

  if (mistakes.length > 0) {
    breakdown.innerHTML = `
      <h3>${mistakeTitle}</h3>
      <div class="mistake-list">
        ${mistakes.slice(-8).map(m => `
          <div class="mistake-item">
            <span class="mistake-q">${m.question.syllableInfo?.hanzi || '?'}</span>
            <span class="mistake-a">${m.question.correctAnswer}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    breakdown.innerHTML = `<p class="perfect-run">${perfectText}</p>`;
  }
}

// ===== Screen Shake Effect =====
export function screenShake() {
  const app = document.getElementById('app');
  app.classList.add('shake');
  setTimeout(() => app.classList.remove('shake'), 400);
}
