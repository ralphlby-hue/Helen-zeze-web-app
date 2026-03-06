export class GameSession {
    constructor() {
        this.isActive = false;
        this.score = 0;
        this.timer = 30; // 30 秒倒數
        // 喺呢度初始化你原本嘅數據
    }

    start() {
        this.isActive = true;
        document.getElementById('game-container').style.display = 'block';
        this.loadNextQuestion(); // 執行你原本嘅 InitialiseNewQ 邏輯
    }

    pause() {
        this.isActive = false;
        document.getElementById('pause-menu').style.display = 'flex';
    }

    resume() {
        this.isActive = true;
        document.getElementById('pause-menu').style.display = 'none';
    }

    stop() {
        this.isActive = false;
        // 清除畫面、重置分數等
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('start-menu').style.display = 'flex';
    }
}