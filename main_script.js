// 隨機揀一個快勞，每個快勞掕住個 tag 表示佢係邊一款粵語音節。
import { AnswerList, AnswerChooser, ValidateAnswerList, Initials, Finals, Tones} from './AnswerKeys.js'; // 粵拼 data 都喺呢度入便...
import { generateFakeAnswers, shuffleArray } from './Gaa_daap_on_gen.js';
import { displayAnswers } from './Renderer.js';
import { setupInputHandler, checkAnswer, correct } from './Hen_dou_input.js';
import { GameSession } from './game_manager.js';

/*
// Set up 啲嘢先... //
*/

// 當前，隻遊戲處於咩狀態？
const GameState = {
    START_MENU: 'START_MENU',
    SELECT_MODE: 'SELECT_MODE',
    STATS: 'STATS',
    SETTINGS: 'SETTINGS',
    PAUSE: 'PAUSE',
    IN_GAME: 'IN_GAME'
};
let currentGameState = GameState.START_MENU;

// 以下呢幾行係用嚟做測試嘅...
//var testElement = document.getElementById("screen-stats");
//testElement.style.display = "block";

let score = 0;
let bestScore = 0;
let currentQuestion = null;

let QuestionsAnswered = 0;
let timeLeft = 0;
let timerInterval = null;
let isInputLocked = false;

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

// 3. 核心 Renderer 函數：更新畫面顯示
function renderByState(currentGameState) {
    // A. 攞晒所有畫面元素
    const screens = {
        [GameState.START_MENU]: document.getElementById('screen-start'),
        [GameState.SELECT_MODE]: document.getElementById('screen-selectDiff'),
        [GameState.STATS]: document.getElementById('screen-stats'),
        [GameState.SETTINGS]: document.getElementById('screen-setting'),
        [GameState.PAUSE]: document.getElementById('screen-pause')
    };
    const gameOn = document.querySelector('.gameOn');

    // B. 隱藏晒啲選單介面先
    Object.values(screens).forEach(el => {
        if (el) el.style.display = 'none';
    });
    gameOn.style.display = 'none'
    if (currentGameState !== GameState.START_MENU) {
        screens[GameState.START_MENU].style.display = 'none';
    }
    
    // C. 根據 currentGameState 決定邊個 visible
    if (currentGameState === GameState.IN_GAME) {
        gameOn.style.display = 'block';
    } else if (currentGameState === GameState.PAUSE) {
        gameOn.style.display = 'block'; // 暫停嗰時通常仲見到遊戲底層
        screens[GameState.PAUSE].style.display = 'flex';
    } else {
        gameOn.style.display = 'none';
        if (screens[currentGameState]) {
            screens[currentGameState].style.display = 'flex';
        }
    }
}

// 4. 切換狀態嘅工具函數
function changeState(newState) {
    currentGameState = newState;
    console.log(`遊戲狀態改咗: ${currentGameState}`);
    renderByState(currentGameState);
    if (currentGameState === GameState.IN_GAME) {
        PlaySession(currentGameMode, currentDifficulty);
    }
}

/*
// 個 main loop 喺呢度開始 //
*/
//changeState(GameState.IN_GAME); // 先直接入遊戲，之後再加個 menu 出嚟揀
// 測試 changeState...

ValidateAnswerList(AnswerList); // 睇下個 AnswerList 係咪有問題先...

function PlaySession(mode, difficulty) {
    currentGameMode = mode;
    currentDifficulty = difficulty;
    console.log(`[Game] 開始遊戲，模式: ${mode}, 難度: ${difficulty}`);
    
    currentQuestion = InitialiseNewQ();
    console.log("抽中嘅題目:", currentQuestion);
    let FakeAns = new Set();
    FakeAns = generateFakeAnswers(currentQuestion, Initials, Finals, Tones);
    // console.log("生成嘅假答案:", FakeAns);
    let AnsArray = [...FakeAns, currentQuestion.syllable];
    // console.log("打亂前嘅答案陣列:", AnsArray);
    shuffleArray(AnsArray);
    // console.log("打亂後嘅答案陣列:", AnsArray);
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
        //console.log("生成嘅假答案:", FakeAns);
        AnsArray = [...FakeAns, currentQuestion.syllable];
        shuffleArray(AnsArray);
        displayAnswers(AnsArray, currentQuestion.syllable);
        updateScoreUI();

        // 延遲少少先出下一題，等玩家睇到啱定錯
        setTimeout(() => {
            loadRound();
        }, 500);

        });
}

function GameOver() {
    console.log("遊戲結束！最終分數:", score);
    }

function setupNavigation() {
    // 1. 搵晒全個網頁所有帶有 data-target-state 屬性嘅元素
    const allButtons = document.querySelectorAll('[data-target-state]');
    console.log("出 allButtons 睇:", allButtons);

    // 2. 同每一粒掣加 Event Listener
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 3. 讀取粒掣想去邊 (HTML 寫 data-target-state，JS 用 dataset.targetState 讀)
            const target = btn.dataset.targetState;

            console.log(`[UI] 玩家撳咗掣，想去: ${target}`);

            // 4. 安全檢查：確保 GameState 真係有呢個狀態先轉
            if (GameState[target]) {
                
                // 特殊邏輯：如果係由 Menu 入 Game，記得要 Start Game！
                // (費事一入去係黑畫面或者舊題目)
                if (target === 'IN_GAME' && currentGameState === GameState.START_MENU) {
                    console.log("[Game] 初始化新遊戲...");
                    // 呢度 call 你之前寫落嘅遊戲開始 function
                    // 例如: startGame(); 或 GameSession(); 
                }

                // 5. 正式轉狀態
                changeState(GameState[target]);
                if (GameState[target] === GameState.IN_GAME) {
                    // console.log("[Game] 開始新遊戲...");
                    currentGameMode = btn.dataset.mode || currentGameMode;
                    currentDifficulty = btn.dataset.diff || currentDifficulty;
                    console.log(`[Game] 模式: ${currentGameMode}, 難度: ${currentDifficulty}`);
                }
            
            } else {
                console.error(`❌ 搵唔到狀態: ${target}，請檢查 HTML 拼字有無錯。`);
            }
        });
    });
}

// 記住要執行佢！
setupNavigation();

// 將數據傳返去我度

// 加 animation: 題目之間嘅 transition、答啱答錯嘅 feedback、unlock 新難度

// Further level: Phrases and words, not just syllables. Phrase and words timed

// 其他功能：排行榜、分享成績、用戶登入系統、個人化設定（例如聲音、主題)


