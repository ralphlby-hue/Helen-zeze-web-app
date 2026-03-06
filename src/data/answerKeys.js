// ==========================================
// 粵韻道場 — Jyutping Answer Database
// Expanded syllable & word bank
// ==========================================

// ===== Jyutping Tables =====
export const Initials = [
  'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k',
  'ng', 'h', 'gw', 'kw', 'w', 'z', 'c', 's', 'j', ''
];

export const Finals = [
  'aa', 'aai', 'aau', 'aam', 'aan', 'aang', 'aap', 'aat', 'aak',
  'ai', 'au', 'am', 'an', 'ang', 'ap', 'at', 'ak',
  'e', 'ei', 'eng', 'ek',
  'i', 'iu', 'im', 'in', 'ing', 'ip', 'it', 'ik',
  'o', 'oi', 'ou', 'on', 'ong', 'ot', 'ok',
  'u', 'ui', 'un', 'ung', 'ut', 'uk',
  'oe', 'oeng', 'oek',
  'eoi', 'eon', 'eot',
  'yu', 'yun', 'yut',
  'm', 'ng'
];

export const Tones = ['1', '2', '3', '4', '5', '6'];

// ===== Syllable Bank =====
// Each entry: { syllable, initial, final, tone, hanzi (example character), meaning }
export const SyllableBank = [
  // ---- Tone 1 (高平 55) ----
  { syllable: 'si1', initial: 's', final: 'i', tone: '1', hanzi: '詩', meaning: 'poem' },
  { syllable: 'jing1', initial: 'j', final: 'ing', tone: '1', hanzi: '精', meaning: 'fine/clever' },
  { syllable: 'zing1', initial: 'z', final: 'ing', tone: '1', hanzi: '晶', meaning: 'crystal' },
  { syllable: 'sing1', initial: 's', final: 'ing', tone: '1', hanzi: '星', meaning: 'star' },
  { syllable: 'gaa1', initial: 'g', final: 'aa', tone: '1', hanzi: '家', meaning: 'home' },
  { syllable: 'faa1', initial: 'f', final: 'aa', tone: '1', hanzi: '花', meaning: 'flower' },
  { syllable: 'baa1', initial: 'b', final: 'aa', tone: '1', hanzi: '巴', meaning: 'bus' },
  { syllable: 'tin1', initial: 't', final: 'in', tone: '1', hanzi: '天', meaning: 'sky' },
  { syllable: 'san1', initial: 's', final: 'an', tone: '1', hanzi: '新', meaning: 'new' },
  { syllable: 'jung1', initial: 'j', final: 'ung', tone: '1', hanzi: '中', meaning: 'middle' },
  { syllable: 'dung1', initial: 'd', final: 'ung', tone: '1', hanzi: '冬', meaning: 'winter' },
  { syllable: 'fung1', initial: 'f', final: 'ung', tone: '1', hanzi: '風', meaning: 'wind' },
  { syllable: 'gong1', initial: 'g', final: 'ong', tone: '1', hanzi: '江', meaning: 'river' },
  { syllable: 'hong1', initial: 'h', final: 'ong', tone: '1', hanzi: '康', meaning: 'healthy' },
  { syllable: 'tong1', initial: 't', final: 'ong', tone: '1', hanzi: '湯', meaning: 'soup' },
  { syllable: 'sam1', initial: 's', final: 'am', tone: '1', hanzi: '心', meaning: 'heart' },
  { syllable: 'gam1', initial: 'g', final: 'am', tone: '1', hanzi: '金', meaning: 'gold' },
  { syllable: 'jan1', initial: 'j', final: 'an', tone: '1', hanzi: '因', meaning: 'because' },
  { syllable: 'hoi1', initial: 'h', final: 'oi', tone: '1', hanzi: '開', meaning: 'open' },
  { syllable: 'bui1', initial: 'b', final: 'ui', tone: '1', hanzi: '杯', meaning: 'cup' },

  // ---- Tone 2 (高升 35) ----
  { syllable: 'si2', initial: 's', final: 'i', tone: '2', hanzi: '史', meaning: 'history' },
  { syllable: 'gwo2', initial: 'gw', final: 'o', tone: '2', hanzi: '果', meaning: 'fruit' },
  { syllable: 'seoi2', initial: 's', final: 'eoi', tone: '2', hanzi: '水', meaning: 'water' },
  { syllable: 'gau2', initial: 'g', final: 'au', tone: '2', hanzi: '狗', meaning: 'dog' },
  { syllable: 'maau1', initial: 'm', final: 'aau', tone: '1', hanzi: '貓', meaning: 'cat' },
  { syllable: 'hou2', initial: 'h', final: 'ou', tone: '2', hanzi: '好', meaning: 'good' },
  { syllable: 'bin2', initial: 'b', final: 'in', tone: '2', hanzi: '扁', meaning: 'flat' },
  { syllable: 'lei2', initial: 'l', final: 'ei', tone: '2', hanzi: '你', meaning: 'you (informal)' },
  { syllable: 'mei5', initial: 'm', final: 'ei', tone: '5', hanzi: '美', meaning: 'beautiful' },

  // ---- Tone 3 (高去 33) ----
  { syllable: 'si3', initial: 's', final: 'i', tone: '3', hanzi: '試', meaning: 'try' },
  { syllable: 'gin3', initial: 'g', final: 'in', tone: '3', hanzi: '見', meaning: 'see' },
  { syllable: 'fan3', initial: 'f', final: 'an', tone: '3', hanzi: '瞓', meaning: 'sleep' },
  { syllable: 'gaau3', initial: 'g', final: 'aau', tone: '3', hanzi: '教', meaning: 'teach' },
  { syllable: 'hau2', initial: 'h', final: 'au', tone: '2', hanzi: '口', meaning: 'mouth' },
  { syllable: 'sung3', initial: 's', final: 'ung', tone: '3', hanzi: '送', meaning: 'send' },
  { syllable: 'bui3', initial: 'b', final: 'ui', tone: '3', hanzi: '背', meaning: 'back' },
  { syllable: 'tai2', initial: 't', final: 'ai', tone: '2', hanzi: '睇', meaning: 'look' },

  // ---- Tone 4 (低平 21) ----
  { syllable: 'si4', initial: 's', final: 'i', tone: '4', hanzi: '時', meaning: 'time' },
  { syllable: 'jan4', initial: 'j', final: 'an', tone: '4', hanzi: '人', meaning: 'person' },
  { syllable: 'lai4', initial: 'l', final: 'ai', tone: '4', hanzi: '來', meaning: 'come' },
  { syllable: 'mun4', initial: 'm', final: 'un', tone: '4', hanzi: '門', meaning: 'door' },
  { syllable: 'ping4', initial: 'p', final: 'ing', tone: '4', hanzi: '平', meaning: 'flat/cheap' },
  { syllable: 'naam4', initial: 'n', final: 'aam', tone: '4', hanzi: '男', meaning: 'male' },
  { syllable: 'jyu4', initial: 'j', final: 'yu', tone: '4', hanzi: '魚', meaning: 'fish' },

  // ---- Tone 5 (低升 23) ----
  { syllable: 'si5', initial: 's', final: 'i', tone: '5', hanzi: '市', meaning: 'city/market' },
  { syllable: 'mou5', initial: 'm', final: 'ou', tone: '5', hanzi: '冇', meaning: 'don\'t have' },
  { syllable: 'nei5', initial: 'n', final: 'ei', tone: '5', hanzi: '你', meaning: 'you' },
  { syllable: 'haai5', initial: 'h', final: 'aai', tone: '5', hanzi: '蟹', meaning: 'crab' },
  { syllable: 'jyu5', initial: 'j', final: 'yu', tone: '5', hanzi: '雨', meaning: 'rain' },
  { syllable: 'ngo5', initial: 'ng', final: 'o', tone: '5', hanzi: '我', meaning: 'I/me' },
  { syllable: 'leoi5', initial: 'l', final: 'eoi', tone: '5', hanzi: '裏', meaning: 'inside' },

  // ---- Tone 6 (低去 22) ----
  { syllable: 'si6', initial: 's', final: 'i', tone: '6', hanzi: '是', meaning: 'is' },
  { syllable: 'daai6', initial: 'd', final: 'aai', tone: '6', hanzi: '大', meaning: 'big' },
  { syllable: 'hok6', initial: 'h', final: 'ok', tone: '6', hanzi: '學', meaning: 'learn' },
  { syllable: 'jat6', initial: 'j', final: 'at', tone: '6', hanzi: '日', meaning: 'day/sun' },
  { syllable: 'jyut6', initial: 'j', final: 'yut', tone: '6', hanzi: '月', meaning: 'moon' },
  { syllable: 'gik6', initial: 'g', final: 'ik', tone: '6', hanzi: '極', meaning: 'extreme' },
  { syllable: 'sik6', initial: 's', final: 'ik', tone: '6', hanzi: '食', meaning: 'eat' },
  { syllable: 'maai6', initial: 'm', final: 'aai', tone: '6', hanzi: '賣', meaning: 'sell' },
  { syllable: 'hai6', initial: 'h', final: 'ai', tone: '6', hanzi: '係', meaning: 'is (copula)' },
  { syllable: 'man6', initial: 'm', final: 'an', tone: '6', hanzi: '問', meaning: 'ask' },

  // ---- More varied initials ----
  { syllable: 'gwong2', initial: 'gw', final: 'ong', tone: '2', hanzi: '廣', meaning: 'broad/Canton' },
  { syllable: 'kwong4', initial: 'kw', final: 'ong', tone: '4', hanzi: '狂', meaning: 'crazy' },
  { syllable: 'ngaa4', initial: 'ng', final: 'aa', tone: '4', hanzi: '牙', meaning: 'tooth' },
  { syllable: 'aa3', initial: '', final: 'aa', tone: '3', hanzi: '亞', meaning: 'Asia/prefix' },
  { syllable: 'wui5', initial: 'w', final: 'ui', tone: '5', hanzi: '會', meaning: 'meeting' },
  { syllable: 'wui6', initial: 'w', final: 'ui', tone: '6', hanzi: '匯', meaning: 'converge' },

  // ---- Entering tones (入聲) with stop codas ----
  { syllable: 'baak6', initial: 'b', final: 'aak', tone: '6', hanzi: '白', meaning: 'white' },
  { syllable: 'hot3', initial: 'h', final: 'ot', tone: '3', hanzi: '喝', meaning: 'shout' },
  { syllable: 'sap6', initial: 's', final: 'ap', tone: '6', hanzi: '十', meaning: 'ten' },
  { syllable: 'baat3', initial: 'b', final: 'aat', tone: '3', hanzi: '八', meaning: 'eight' },
  { syllable: 'luk6', initial: 'l', final: 'uk', tone: '6', hanzi: '六', meaning: 'six' },
  { syllable: 'cat1', initial: 'c', final: 'at', tone: '1', hanzi: '七', meaning: 'seven' },
  { syllable: 'gap1', initial: 'g', final: 'ap', tone: '1', hanzi: '急', meaning: 'urgent' },
  { syllable: 'dak1', initial: 'd', final: 'ak', tone: '1', hanzi: '得', meaning: 'can/get' },
  { syllable: 'jap6', initial: 'j', final: 'ap', tone: '6', hanzi: '入', meaning: 'enter' },
  { syllable: 'cit3', initial: 'c', final: 'it', tone: '3', hanzi: '切', meaning: 'cut' },
  { syllable: 'zit3', initial: 'z', final: 'it', tone: '3', hanzi: '節', meaning: 'festival' },
];

// ===== Word Bank =====
// Multi-character words for the Words mode
export const WordBank = [
  { word: '你好', jyutping: 'nei5 hou2', syllables: ['nei5', 'hou2'], meaning: 'hello' },
  { word: '多謝', jyutping: 'do1 ze6', syllables: ['do1', 'ze6'], meaning: 'thank you' },
  { word: '早晨', jyutping: 'zou2 san4', syllables: ['zou2', 'san4'], meaning: 'good morning' },
  { word: '食飯', jyutping: 'sik6 faan6', syllables: ['sik6', 'faan6'], meaning: 'eat rice/meal' },
  { word: '飲茶', jyutping: 'jam2 caa4', syllables: ['jam2', 'caa4'], meaning: 'drink tea / dim sum' },
  { word: '唔該', jyutping: 'm4 goi1', syllables: ['m4', 'goi1'], meaning: 'excuse me / thanks' },
  { word: '香港', jyutping: 'hoeng1 gong2', syllables: ['hoeng1', 'gong2'], meaning: 'Hong Kong' },
  { word: '學校', jyutping: 'hok6 haau6', syllables: ['hok6', 'haau6'], meaning: 'school' },
  { word: '朋友', jyutping: 'pang4 jau5', syllables: ['pang4', 'jau5'], meaning: 'friend' },
  { word: '開心', jyutping: 'hoi1 sam1', syllables: ['hoi1', 'sam1'], meaning: 'happy' },
  { word: '返工', jyutping: 'faan1 gung1', syllables: ['faan1', 'gung1'], meaning: 'go to work' },
  { word: '落雨', jyutping: 'lok6 jyu5', syllables: ['lok6', 'jyu5'], meaning: 'raining' },
  { word: '太陽', jyutping: 'taai3 joeng4', syllables: ['taai3', 'joeng4'], meaning: 'sun' },
  { word: '星期', jyutping: 'sing1 kei4', syllables: ['sing1', 'kei4'], meaning: 'week' },
  { word: '電話', jyutping: 'din6 waa2', syllables: ['din6', 'waa2'], meaning: 'phone' },
  { word: '巴士', jyutping: 'baa1 si2', syllables: ['baa1', 'si2'], meaning: 'bus' },
  { word: '冰室', jyutping: 'bing1 sat1', syllables: ['bing1', 'sat1'], meaning: 'bing sutt (HK cafe)' },
  { word: '茶餐廳', jyutping: 'caa4 caan1 teng1', syllables: ['caa4', 'caan1', 'teng1'], meaning: 'cha chaan teng' },
  { word: '加油', jyutping: 'gaa1 jau2', syllables: ['gaa1', 'jau2'], meaning: 'add oil / keep it up' },
  { word: '得閒', jyutping: 'dak1 haan4', syllables: ['dak1', 'haan4'], meaning: 'free time' },
];

// ===== Validation =====
export function validateSyllableBank(bank) {
  let errors = [];
  bank.forEach((item, idx) => {
    const reconstructed = item.initial + item.final + item.tone;
    if (reconstructed !== item.syllable) {
      errors.push({ idx, expected: item.syllable, got: reconstructed });
    }
  });
  if (errors.length > 0) {
    console.warn('⚠️ SyllableBank validation errors:', errors);
  } else {
    console.log('✅ SyllableBank: all entries valid');
  }
  return errors.length === 0;
}
