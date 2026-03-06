// ==========================================
// TTS Audio Module — Browser Speech Synthesis
// Uses Cantonese (yue) voice if available
// ==========================================

let cachedVoice = null;
let voiceReady = false;

// Try to find a Cantonese voice
function findCantoVoice() {
  const voices = speechSynthesis.getVoices();
  // Priority: yue > zh-HK > zh-TW > zh
  const priorities = [
    v => v.lang === 'yue' || v.lang === 'yue-Hant-HK' || v.lang.startsWith('yue'),
    v => v.lang === 'zh-HK' || v.lang === 'zh-Hant-HK',
    v => v.lang.startsWith('zh-HK') || v.lang.includes('HK'),
    v => v.lang.startsWith('zh') && v.name.toLowerCase().includes('cantonese'),
    v => v.lang.startsWith('zh'),
  ];
  for (const predicate of priorities) {
    const found = voices.find(predicate);
    if (found) return found;
  }
  return null;
}

// Initialize voices (they load async in some browsers)
export function initTTS() {
  return new Promise((resolve) => {
    const tryLoad = () => {
      cachedVoice = findCantoVoice();
      voiceReady = true;
      resolve(cachedVoice);
    };

    if (speechSynthesis.getVoices().length > 0) {
      tryLoad();
    } else {
      speechSynthesis.addEventListener('voiceschanged', tryLoad, { once: true });
      // Fallback timeout
      setTimeout(tryLoad, 2000);
    }
  });
}

// Speak a Cantonese text (character or word)
export function speakCantonese(text) {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech Synthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (cachedVoice) {
      utterance.voice = cachedVoice;
      utterance.lang = cachedVoice.lang;
    } else {
      // Fallback: try zh-HK
      utterance.lang = 'zh-HK';
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    speechSynthesis.speak(utterance);
  });
}

// Get voice info for debugging
export function getVoiceInfo() {
  if (cachedVoice) {
    return `${cachedVoice.name} (${cachedVoice.lang})`;
  }
  return 'No Cantonese voice found, using fallback zh-HK';
}
