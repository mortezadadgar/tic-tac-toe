// add 1 or -1 and sum in every direction is smarter
function checkWinner(board) {
	// Check rows
	for (let i = 0; i < 3; i++) {
		if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
			return board[i][0];
		}
	}

	// Check columns
	for (let i = 0; i < 3; i++) {
		if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
			return board[0][i];
		}
	}

	// Check diagonals
	if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
		return board[0][0];
	}
	if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
		return board[0][2];
	}

	// If no winner is found, return null
	return null;
}

let board = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];
let winner = null;

function makeMove(row, col) {
	// Update the board with the player's move
	board[row][col] = 'X'; // or 'O' depending on the player

	// Check for a winner
	winner = checkWinner(board);

	if (winner !== null) {
		// Handle the win condition
		console.log(`Player ${winner} wins!`);
	}
}
