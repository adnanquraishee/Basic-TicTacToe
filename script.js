const mainPage = document.getElementById('main-page');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-btn');
const playerXInput = document.getElementById('player-x');
const playerOInput = document.getElementById('player-o');

startButton.addEventListener('click', startGame);

function startGame() {
    const playerXName = playerXInput.value || 'Player X';
    const playerOName = playerOInput.value || 'Player O';
    mainPage.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.getElementById('status').innerText = `Round 1 - ${playerXName}'s turn`;
    document.getElementById('x-score').innerText = `${playerXName}: 0`;
    document.getElementById('o-score').innerText = `${playerOName}: 0`;

    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart-btn');
    const xScoreDisplay = document.getElementById('x-score');
    const oScoreDisplay = document.getElementById('o-score');
    const cells = document.querySelectorAll('[data-cell]');
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let currentPlayer = X_CLASS;
    let gameActive = true;
    let roundWinner = null;
    let xScore = 0;
    let oScore = 0;
    let round = 1;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    startGame();

    restartButton.addEventListener('click', restartGame);

    function startGame() {
        roundWinner = null;
        status.innerText = `Round ${round} - ${playerXName}'s turn`;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
        gameActive = true;
    }

    function handleClick(e) {
        if (!gameActive) return;
        const cell = e.target;
        const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endRound(currentClass);
        } else if (isDraw()) {
            endRound('draw');
        } else {
            swapTurns();
            setBoardHoverClass();
        }
    }

    function placeMark(cell, currentClass) {
        cell.innerText = currentClass.toUpperCase();
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        status.innerText = `Round ${round} - ${currentPlayer === X_CLASS ? playerXName : playerOName}'s turn`;
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        board.classList.add(currentPlayer);
    }

    function checkWin(currentClass) {
        return winningCombos.some(combo => {
            return combo.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function endRound(winner) {
        if (winner === X_CLASS) {
            roundWinner = 'X';
            xScore++;
        } else if (winner === O_CLASS) {
            roundWinner = 'O';
            oScore++;
        }

        if (roundWinner) {
            status.innerText = `${roundWinner} wins the round!`;
        } else {
            status.innerText = 'It\'s a draw!';
        }

        updateScoreboard();
        round++;

        if (xScore === 3 || oScore === 3) {
            endGame();
        } else {
            gameActive = false;
            setTimeout(startGame, 1500);
        }
    }

    function updateScoreboard() {
        xScoreDisplay.innerText = `${playerXName}: ${xScore}`;
        oScoreDisplay.innerText = `${playerOName}: ${oScore}`;
    }

    function endGame() {
        if (xScore > oScore) {
            status.innerText = `${playerXName} wins the game!`;
        } else if (oScore > xScore) {
            status.innerText = `${playerOName} wins the game!`;
        } else {
            status.innerText = 'It\'s a draw!';
        }

        gameActive = false;
    }

    function restartGame() {
        mainPage.classList.remove('hidden');
        gameContainer.classList.add('hidden');
        xScore = 0;
        oScore = 0;
        round = 1;
        startGame();
    }
}




