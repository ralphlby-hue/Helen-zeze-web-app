export function setupInputHandler(containerId, callback) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error('搵唔到 ID 為 ${containerId} 嘅容器');
        return;
    }

    console.log(`成功搵到 ID 為 ${containerId} 嘅容器，準備監聽玩家嘅答案選擇...`);
    // Feb 8: 上面嗰行，正常運作...

    // 使用 Event Delegation 監聽所有子元素的 click
    container.addEventListener('click', (event) => {
        // 確保玩家係撳中咗 answer-cell 而唔係個容器嘅空位
        //console.log("玩家撳咗容器，檢查撳咗邊個元素...");
        const clickedElement = event.target.closest('.answer-cells');
        //console.log("玩家撳咗答案格：", clickedElement);

        if (clickedElement) {
            console.log("玩家撳咗答案格：", clickedElement.textContent);
            callback(clickedElement);
        }
    });
}
