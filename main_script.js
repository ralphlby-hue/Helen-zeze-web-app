// 隨機揀一個快勞，每個快勞掕住個 tag 表示佢係邊一款粵語音節。
import { AnswerList, AnswerChooser, ValidateAnswerList, Initials, Finals, Tones} from './AnswerKeys.js'; // 粵拼 data 都喺呢度入便...
import { generateFakeAnswers, shuffleArray } from './Gaa_daap_on_gen.js';
import { displayAnswers } from './Renderer.js';
import { setupInputHandler } from './Hen_dou_input.js';

// 出新題目
function InitialiseNewQ() {
    const selectedItem = AnswerChooser(AnswerList);

    if (!selectedItem) {
        console.error("抽唔到任何題目，唔該檢查下 AnswerList 係咪吉嘅。");
        return null;
    }

    // 攞到快勞名 (假設 selectedItem.faainou 係路徑，例如 'sounds/apple.mp3')
    let audioPath = selectedItem.faainou;
    // 嘗試播放聲音
    //const audio = new Audio(audioPath);
    // 播放成功
    /*
    audio.play()
        .then(() => {
            console.log(`✅ 正在播放: ${audioPath}`);
        })
        .catch(error => {
            // 呢度會捉到「搵唔到檔案」或者「瀏覽器阻住咗自動播放」嘅 Error
            console.log(`❌ 搵唔到個快勞或者播放出錯: ${audioPath}`);
            console.error("Error 詳情:", error);
        });
    */

    // 3. 喺 find 入面比較 id 嘅時候，要攞返 randomObject 裡面個 id
    return { 
            faainou: selectedItem.faainou, 
            syllable: selectedItem.syllable, 
            init: selectedItem.start,
            final: selectedItem.final,
            tone: selectedItem.tone
        };
}

/*
// 個 main loop 喺呢度開始 //
*/

//console.log(AnswerList);
//console.log("聲母表 (Initials):", Initials);
//console.log("韻母表 (Finals):", Finals);
ValidateAnswerList(AnswerList); // 睇下個 AnswerList 係咪有問題先...
let currentQuestion = InitialiseNewQ();
console.log("抽中嘅題目:", currentQuestion);
let FakeAns = new Set();

FakeAns = generateFakeAnswers(currentQuestion, Initials, Finals, Tones);
console.log("生成嘅假答案:", FakeAns);

let AnsArray = [...FakeAns, currentQuestion.syllable];
console.log("打亂前嘅答案陣列:", AnsArray);

shuffleArray(AnsArray);
console.log("打亂後嘅答案陣列:", AnsArray);

displayAnswers(AnsArray, currentQuestion.syllable);
setupInputHandler('answer-cells', (selectedAnswer) => {

});
// Check 答案，記分

// 下一題

// 將數據傳返去我度
