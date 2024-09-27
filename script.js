function solveNQueens() {
    const n = parseInt(document.getElementById('n').value);
    const grid = document.getElementById('puzzleGrid');
    grid.innerHTML = ''; // Clear previous grid
    grid.style.gridTemplateColumns = `repeat(${n}, 60px)`;

    const board = Array.from({ length: n }, () => Array(n).fill(0));
    if (placeQueens(board, 0, n)) {
        renderBoard(board, n);
    } else {
        alert('No solution exists!');
    }
}

function placeQueens(board, row, n) {
    if (row === n) return true; // All queens are placed

    for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 1; // Place queen
            if (placeQueens(board, row + 1, n)) return true; // Recur
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
}

function isSafe(board, row, col, n) {
    for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false; // Check column
        if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) return false; // Check left diagonal
        if (col + (row - i) < n && board[i][col + (row - i)] === 1) return false; // Check right diagonal
    }
    return true;
}

function renderBoard(board, n) {
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = document.createElement('div');
            cell.className = (row + col) % 2 === 0 ? 'cell white' : 'cell black';
            if (board[row][col] === 1) {
                cell.innerHTML = '♛'; // Queen symbol
                cell.classList.add('queen');
            }
            document.getElementById('puzzleGrid').appendChild(cell);
        }
    }
}
