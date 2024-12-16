// script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-btn');
let currentPlayer = 'X'; // X começa o jogo
let board = ['', '', '', '', '', '', '', '', '']; // Tabuleiro vazio
let gameActive = true;

// Função para verificar se um jogador venceu
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

    // Verifica se houve empate
    if (!board.includes('')) {
        gameActive = false;
        setTimeout(() => alert('Empate!'), 100);
    }
}

// Função para manipular as jogadas
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell');

    // Verifica se a célula já foi clicada ou se o jogo acabou
    if (board[cellIndex] || !gameActive) return;

    // Marca a célula com o símbolo do jogador atual
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Verifica se alguém venceu
    checkWinner();

    // Alterna entre os jogadores
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para reiniciar o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = ''); // Limpa o conteúdo das células
}

// Adiciona o evento de clique em cada célula
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adiciona o evento de reiniciar o jogo
resetButton.addEventListener('click', resetGame);
