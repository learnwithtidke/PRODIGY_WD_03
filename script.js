const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-id');
    
    if (gameActive && !cell.textContent) {
        cell.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            announceWinner(cells[a].textContent);
            break;
        }
    }
}

function announceWinner(winner) {
    gameActive = false;
    alert(`${winner} wins!`);
}

function checkDraw() {
    const isDraw = [...cells].every(cell => cell.textContent !== '');
    if (isDraw) {
        gameActive = false;
        alert("It's a draw!");
    }
}
