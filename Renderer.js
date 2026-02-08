export function displayAnswers(AnsArray, correctAnswer) {
    const container = document.getElementById('answer-cells');
    const feedback = document.getElementById('feedback');
    container.innerHTML = ''; // 清空之前嘅答案
    feedback.textContent = '';

    AnsArray.forEach((answer, index) => {
        const cell = document.createElement('div');
        cell.className = 'answer-cells';
        cell.textContent = answer;
        cell.dataset.answer = answer;
        container.appendChild(cell);
    });
}