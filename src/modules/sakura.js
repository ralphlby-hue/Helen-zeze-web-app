// ==========================================
// Sakura Particle Effect
// ==========================================

const PETAL_COUNT = 15;
const PETAL_CHARS = ['🌸', '✿', '❀', '🏵'];

export function initSakura(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < PETAL_COUNT; i++) {
    createPetal(container, i);
  }
}

function createPetal(container, index) {
  const petal = document.createElement('div');
  petal.className = 'sakura-petal';
  petal.textContent = PETAL_CHARS[index % PETAL_CHARS.length];

  // Random properties
  const size = 12 + Math.random() * 14;
  const left = Math.random() * 100;
  const delay = Math.random() * 15;
  const duration = 10 + Math.random() * 15;
  const drift = -50 + Math.random() * 100;

  petal.style.cssText = `
    position: fixed;
    top: -30px;
    left: ${left}%;
    font-size: ${size}px;
    opacity: ${0.15 + Math.random() * 0.3};
    animation: sakura-fall ${duration}s linear ${delay}s infinite;
    --drift: ${drift}px;
    pointer-events: none;
    z-index: 0;
    filter: blur(${Math.random() > 0.7 ? 1 : 0}px);
  `;

  container.appendChild(petal);
}
