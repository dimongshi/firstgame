// script.js
const GAME_CONFIG = {
    GAME_DURATION: 30,
    MOUSE_APPEAR_INTERVAL: 1000,
    MOUSE_DISAPPEAR_TIME: 1500,
    SCORE_PER_HIT: 10,
};

const welcomePage = document.getElementById('welcome-page');
const startButton = document.getElementById('start-button');
const gamePage = document.getElementById('game-page');
const resultModal = document.getElementById('result-modal');
const scoreDisplay = document.getElementById('score-display');
const timeDisplay = document.getElementById('time-display');
const finalScoreDisplay = document.getElementById('final-score');
const replayButton = document.getElementById('replay-button');
const holes = document.querySelectorAll('.hole');

let currentScore = 0;
let timeLeft = GAME_CONFIG.GAME_DURATION;
let gameInterval;
let mouseInterval;

function resetGame() {
    currentScore = 0;
    timeLeft = GAME_CONFIG.GAME_DURATION;
    scoreDisplay.textContent = `得分: ${currentScore}`;
    timeDisplay.textContent = `倒计时: ${timeLeft}`;
    resultModal.style.display = 'none';
    gamePage.style.display = 'block'; // 确保游戏页面显示
    welcomePage.style.display = 'none'; // 隐藏欢迎页面
}
const difficultySelect = document.getElementById('difficulty-select');
let difficulty = difficultySelect.value; // 默认难度为简单
difficultySelect.addEventListener('change', function() {
    difficulty = difficultySelect.value;
});

function startGame() {
    resetGame();
    clearInterval(gameInterval);
    clearInterval(mouseInterval);
    // 根据难度设置地鼠出现间隔
    let mouseAppearInterval;
    if (difficulty === 'easy') {
        mouseAppearInterval = 30000 / 18; // 30秒内平均出现18个地鼠
    } else if (difficulty === 'normal') {
        mouseAppearInterval = 30000 / 38; // 30秒内平均出现38个地鼠
    } else if (difficulty === 'hard') {
        mouseAppearInterval = 30000 / 58; // 30秒内平均出现58个地鼠
    }

    gameInterval = setInterval(updateTime, 1000);
    mouseInterval = setInterval(appearMouse, mouseAppearInterval);
}

function updateTime() {
    timeLeft--;
    timeDisplay.textContent = `倒计时: ${timeLeft}`;
    if (timeLeft === 0) {
        endGame();
    }
}

function appearMouse() {
    // 找到所有没有地鼠的洞
    const emptyHoles = Array.from(holes).filter(hole => !hole.querySelector('.mouse'));
    
    // 如果没有空洞，则不生成地鼠
    if (emptyHoles.length === 0) {
        return;
    }
    
    const randomHole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
    const mouse = document.createElement('div');
    mouse.classList.add('mouse');
    randomHole.appendChild(mouse);
    setTimeout(() => {
        randomHole.removeChild(mouse);
    }, GAME_CONFIG.MOUSE_DISAPPEAR_TIME);
}

function hitMouse(event) {
    if (event.target.classList.contains('mouse')) {
        currentScore += GAME_CONFIG.SCORE_PER_HIT;
        scoreDisplay.textContent = `得分: ${currentScore}`;
        event.target.parentNode.removeChild(event.target);
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(mouseInterval);
    finalScoreDisplay.textContent = `最终得分: ${currentScore}`;

    // 根据难度设置满分
    let maxScore;
    if (difficulty === 'easy') {
        maxScore = 180;
    } else if (difficulty === 'normal') {
        maxScore = 380;
    } else if (difficulty === 'hard') {
        maxScore = 580;
    }
    const maxScoreDisplay = document.getElementById('max-score');
    maxScoreDisplay.textContent = `满分: ${maxScore}`;

    resultModal.style.display = 'flex';
    gamePage.style.display = 'none';
    welcomePage.style.display = 'none';
    startButton.style.display = 'none';
}

startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', startGame);
gamePage.addEventListener('click', hitMouse);
