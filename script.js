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

function startGame() {
    resetGame();
    // 清除之前可能存在的定时器
    clearInterval(gameInterval);
    clearInterval(mouseInterval);
    gameInterval = setInterval(updateTime, 1000);
    mouseInterval = setInterval(appearMouse, GAME_CONFIG.MOUSE_APPEAR_INTERVAL);
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
    resultModal.style.display = 'flex';
    gamePage.style.display = 'none';
    welcomePage.style.display = 'none'; // 隐藏欢迎页面
    startButton.style.display = 'none'; // 隐藏开始游戏按钮
}

startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', startGame);
gamePage.addEventListener('click', hitMouse);
