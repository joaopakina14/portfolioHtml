const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-btn');
let currentPlayer = 'X'; // X starts the game
let board = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true;

// Minimax algorithm for AI to find the best move
function minimax(board, depth, isMaximizing) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check if the game has ended
    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return 'X' or 'O' if there's a winner
            }
        }
        return null;
    }

    // Check for a winner
    const winner = checkWinner();
    if (winner === 'X') return -1; // Player wins
    if (winner === 'O') return 1;  // AI wins
    if (!board.includes('')) return 0; // Draw (no more moves available)

    // AI's move (Maximizing) or player's move (Minimizing)
    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // AI's move
                best = Math.max(best, minimax(board, depth + 1, false));
                board[i] = ''; // Undo move
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X'; // Player's move
                best = Math.min(best, minimax(board, depth + 1, true));
                board[i] = ''; // Undo move
            }
        }
        return best;
    }
}

// Function for the AI to make its move
function bestMove() {
    let bestVal = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O'; // Try AI's move
            let moveVal = minimax(board, 0, false);
            board[i] = ''; // Undo move

            if (moveVal > bestVal) {
                move = i;
                bestVal = moveVal;
            }
        }
    }
    return move;
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            setTimeout(() => alert(`${board[a]} venceu!`), 100);
            return;
        }
    }

    // Check if it's a draw
    if (!board.includes('')) {
        gameActive = false;
        setTimeout(() => alert('Empate!'), 100);
    }
}

// Function to handle a player's move and AI's move
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell');

    // Check if the cell is already clicked or if the game is over
    if (board[cellIndex] || !gameActive) return;

    // Player's move
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a winner after player's move
    checkWinner();

    // If the game is still active, it's the AI's turn
    if (gameActive) {
        currentPlayer = 'O'; // AI's turn
        const aiMove = bestMove(); // Get the AI's best move
        board[aiMove] = 'O'; // AI marks the cell
        document.querySelector(`[data-cell="${aiMove}"]`).textContent = 'O'; // Update the display
        checkWinner(); // Check if AI won after its move
        currentPlayer = 'X'; // Switch back to player's turn
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = ''); // Clear the cells
}

// Add click event to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add event for resetting the game
resetButton.addEventListener('click', resetGame);
