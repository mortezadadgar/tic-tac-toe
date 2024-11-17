<script lang="ts">
	type Symbol = 'X' | 'O' | undefined;

	type Board = {
		element: HTMLButtonElement | undefined;
		symbol: Symbol;
	};

	const board: Board[][] = Array(3)
		.fill(0)
		.map(() =>
			Array(3)
				.fill(0)
				.map(() => ({ element: undefined, symbol: undefined }))
		);

	type Stats = {
		crossWins: number;
		cricleWins: number;
		currentTurn: Symbol;
	};

	let stats: Stats = {
		crossWins: 0,
		cricleWins: 0,
		// start with cross
		currentTurn: 'X'
	};

	function checkWinner(): Symbol | null {
		// Check rows
		for (let i = 0; i < 3; i++) {
			if (
				board[i][0].symbol === board[i][1].symbol &&
				board[i][1].symbol === board[i][2].symbol &&
				board[i][0].symbol !== undefined
			) {
				return board[i][0].symbol;
			}
		}

		// Check columns
		for (let i = 0; i < 3; i++) {
			if (
				board[0][i].symbol === board[1][i].symbol &&
				board[1][i].symbol === board[2][i].symbol &&
				board[0][i].symbol !== undefined
			) {
				return board[0][i].symbol;
			}
		}

		// Check diagonals
		if (
			board[0][0].symbol === board[1][1].symbol &&
			board[1][1].symbol === board[2][2].symbol &&
			board[0][0] !== undefined
		) {
			return board[0][0].symbol;
		}
		if (
			board[0][2].symbol === board[1][1].symbol &&
			board[1][1].symbol === board[2][0].symbol &&
			board[0][2] !== undefined
		) {
			return board[0][2].symbol;
		}

		return null;
	}

	function clearBoard() {
		board.forEach((row) =>
			row.forEach((cell) => {
				if (cell.element) {
					cell.element.innerHTML = '';
				}
				cell.symbol = undefined;
			})
		);
	}

	// check if no empty cell left
	function checkFill() {
		let foundEmptyCell: boolean = false;
		board.forEach((row) =>
			row.forEach((cell) => {
				if (cell.symbol == undefined) {
					foundEmptyCell = true;
				}
			})
		);

		return !foundEmptyCell;
	}

	function createImageElement(turnSymbol: Symbol): HTMLImageElement {
		const imagePath = {
			X: '/img/red-cross.png',
			O: '/img/green-cricle.png'
		};

		const img = document.createElement('img');
		img.src = imagePath[turnSymbol!];
		img.classList.add('size-32');

		return img;
	}

	function onCellClick(b: Board) {
		if (b.element?.hasChildNodes()) {
			return;
		}

		const img = createImageElement(stats.currentTurn);
		b.element?.appendChild(img);

		if (stats.currentTurn == 'X') {
			stats.currentTurn = 'O';
			b.symbol = 'X';
		} else {
			stats.currentTurn = 'X';
			b.symbol = 'O';
		}

		let winner = checkWinner();
		if (winner == 'O') {
			stats.cricleWins++;
		} else if (winner == 'X') {
			stats.crossWins++;
		}

		// clear board and reset current turn
		if (winner != null || checkFill()) {
			clearBoard();
			stats.currentTurn = 'X';
		}
	}
</script>

<div class="flex flex-col items-center justify-center">
	<p class="pb-9 text-xl">بازی دوز</p>
	<div class="text-xl font-bold">{stats.cricleWins} - {stats.crossWins}</div>
	<div class="flex items-center justify-center">
		<img
			class="m-2 size-32"
			class:opacity-30={stats.currentTurn == 'X'}
			src="/img/green-cricle.png"
			alt=""
		/>
		<div class="grid grid-cols-3 grid-rows-3 gap-6">
			{#each board as b, i (i)}
				{#each Array(3) as _, i (i)}
					<button
						aria-label="cube"
						on:click={() => onCellClick(b[i])}
						bind:this={b[i].element}
						class="size-32 bg-blue-600"
						type="button"
					></button>
				{/each}
			{/each}
		</div>
		<img
			class="m-2 size-32"
			class:opacity-30={stats.currentTurn == 'O'}
			src="/img/red-cross.png"
			alt=""
		/>
	</div>
</div>
