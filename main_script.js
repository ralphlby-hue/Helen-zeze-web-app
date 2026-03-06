// 隨機揀一個快勞，每個快勞掕住個 tag 表示佢係邊一款粵語音節。
import { AnswerList, AnswerChooser, ValidateAnswerList, Initials, Finals, Tones} from './AnswerKeys.js'; // 粵拼 data 都喺呢度入便...
import { generateFakeAnswers, shuffleArray } from './Gaa_daap_on_gen.js';
import { displayAnswers } from './Renderer.js';
import { setupInputHandler, checkAnswer, correct } from './Hen_dou_input.js';
import { openPauseMenu } from './PauseMenu.js';

let score = 0;
let bestScore = 0;
let currentQuestion = null;

// 遊戲有幾個模式...
// PRACTICE 模式：無限時間，計每十題答啱幾多題。
// CHALLENGE 模式：每題有時間限制，答啱就加時，可以無止盡，一路至到時間用盡為止，可能加儲存功能。
const gameMode = {
    PRACTICE: 'practice',
    CHALLENGE: 'challenge'
};

// EASY：啲可能答案之間差異好大
// HARD：啲可能答案之間差異好細，甚至只係聲調唔同
// TYPER：玩家要打出正確嘅拼音，而唔係揀
const difficultyLevel = {
    EASY: 'easy',
    HARD: 'hard',
    TYPER: 'typer'
}

// 隻 app 係咪處於 pause 咗嘅狀態？
const paused = false;

// 初始化：設定初頭嘅遊戲模式同難度
let currentGameMode = gameMode.PRACTICE;
let currentDifficulty = difficultyLevel.EASY;

// 先搵定啲容器，費事每次都要搵
const scoreContainer = document.querySelector('.score-container');
const bestScoreContainer = document.querySelector('.best-container');

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

// Ap1 dei1 分數
function updateScoreUI() {
    // 留意：原本個 CSS 係用 .score-container 而唔係 ID
    if (scoreContainer) scoreContainer.textContent = score;
    if (bestScoreContainer) bestScoreContainer.textContent = bestScore;
}

/*
// 個 main loop 喺呢度開始 //
*/
//console.log(AnswerList);
//console.log("聲母表 (Initials):", Initials);
//console.log("韻母表 (Finals):", Finals);
ValidateAnswerList(AnswerList); // 睇下個 AnswerList 係咪有問題先...
currentQuestion = InitialiseNewQ();
console.log("抽中嘅題目:", currentQuestion);
let FakeAns = new Set();
FakeAns = generateFakeAnswers(currentQuestion, Initials, Finals, Tones);
console.log("生成嘅假答案:", FakeAns);
let AnsArray = [...FakeAns, currentQuestion.syllable];
console.log("打亂前嘅答案陣列:", AnsArray);
shuffleArray(AnsArray);
console.log("打亂後嘅答案陣列:", AnsArray);
displayAnswers(AnsArray, currentQuestion.syllable);

setupInputHandler('answer-cells', (clickedElement) => {
    checkAnswer(clickedElement, currentQuestion);
    if (correct == true){
        console.log("玩家答啱咗，準備出下一題...");
        score++;
        bestScore = Math.max(score, bestScore);
        } else {
            console.log("玩家答錯咗，準備出下一題...");
        }

    // 出新題目
    currentQuestion = InitialiseNewQ();
    console.log("抽中嘅題目:", currentQuestion);
    FakeAns = generateFakeAnswers(currentQuestion, Initials, Finals, Tones);
    console.log("生成嘅假答案:", FakeAns);
    AnsArray = [...FakeAns, currentQuestion.syllable];
    shuffleArray(AnsArray);
    displayAnswers(AnsArray, currentQuestion.syllable);
    updateScoreUI();

    // 延遲少少先出下一題，等玩家睇到啱定錯
    setTimeout(() => {
        loadRound();
    }, 500);

    });

// 將數據傳返去我度

// 加 animation: 題目之間嘅 transition、答啱答錯嘅 feedback、unlock 新難度

// Further level: Phrases and words, not just syllables. Phrase and words timed

// 其他功能：排行榜、分享成績、用戶登入系統、個人化設定（例如聲音、主題)


