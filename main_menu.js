export class GameSession {
    constructor() {
        this.isActive = false;
        this.score = 0;
        this.timer = 30; // 30 秒倒數
        this.questionSet = []; // 你嘅問題集
        // 喺呢度初始化你原本嘅數據
    }

    start() {
        this.isActive = true;
    }

    pause() {
        this.isActive = false;
    }

    resume() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
        // 清除畫面、重置分數等
    }
}
