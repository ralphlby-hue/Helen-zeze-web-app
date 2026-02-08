// 想加新答案嘅，喺呢度加...
export const AnswerList = [
    { id: 1, faainou: 'jing1.mp3', syllable: 'jing1', start: 'j', final: 'ing', tone: '1'},
    { id: 2, faainou: 'zing1.mp3', syllable: 'zing1', start: 'z', final: 'ing', tone: '1'},
    { id: 3, faainou: 'sing1.mp3', syllable: 'sing1', start: 's', final: 'ing', tone: '1'}
];

// 呢度，用嚟 check (cek1) 下 Answerlist 有冇出錯。
export function ValidateAnswerList(list) {
    let errors = [];

    list.forEach(item => {
        // 將 start, final, tone 拼埋一齊
        const reconstructed = item.start + item.final + item.tone;

        // 比較拼合結果同原本個 syllable
        if (reconstructed !== item.syllable) {
            errors.push({
                id: item.id,
                expected: item.syllable,
                actual: reconstructed,
                message: `❌ ID ${item.id}: 拼合結果不符！`
            });
        }
    });

    if (errors.length === 0) {
        console.log("✅ 所有音節校對正確！");
        return true;
    } else {
        console.log("❌ 音節列表嗰度出咗景轟！");
        console.table(errors); // 用 table 睇得清楚邊度出事
        return false;
    }
}

export function AnswerChooser(dlist) {
    const randomIndex = Math.floor(Math.random() * dlist.length);
    return dlist[randomIndex];
}

// 呢度儲住啲粵拼嘅 data...

// 聲母表 (Initials) - 包括空聲母 (以 empty string 表示)
export const Initials = [
    'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 
    'ng', 'h', 'gw', 'kw', 'w', 'z', 'c', 's', 'j', ''
];

// 韻母表 (Finals) - 呢度列出最常用嘅一部分
export const Finals = [
    'aa', 'aai', 'aau', 'aam', 'aan', 'aang', 'aap', 'aat', 'aak',
    'ai', 'au', 'am', 'an', 'ang', 'ap', 'at', 'ak',
    'e', 'ei', 'eu', 'em', 'en', 'eng', 'ep', 'et', 'ek',
    'i', 'iu', 'im', 'in', 'ing', 'ip', 'it', 'ik',
    'o', 'oi', 'ou', 'on', 'ong', 'ot', 'ok',
    'u', 'ui', 'un', 'ung', 'ut', 'uk',
    'oe', 'oey', 'oen', 'oeng', 'oet', 'oek',
    'yu', 'yun', 'yut'
];

export const Tones = [
    '1', '2', '3', '4', '5', '6'
];