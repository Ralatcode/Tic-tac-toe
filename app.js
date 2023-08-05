// winning logic

const gameBoard = () => {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
        board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const markPlayerInput = (player, row, col) => {
        const playerSpot = board[row][col];
        // checks if cell is empty
        playerSpot.getValue() === 0 ? playerSpot.addPlayerMark(player.token): console.log('this cell is not empty');

    }

    const printBoard = () => {
        const boardWithValue = board.map((row) => row.map((cell) => cell.getValue()))
    }

    return {getBoard, markPlayerInput, printBoard};
}



function Cell() {
    let value = 0;

    const addPlayerMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addPlayerMark, getValue};
}

// player factory function
const Players = (player, token) => {
    let playerName = player;
    const updatePlayerName = (playerInput) => playerName = playerInput;
    
    const getPlayerName = () => playerName;

    return {player, token, getPlayerName, updatePlayerName};
}


const GameController = () => {
    const playerOne = Players('Player-One', 'X');
    const playerTwo = Players('Player-Two', 'O');

    const players = [playerOne, playerTwo];

    let activePlayer = players[0];

    const board1 = gameBoard();

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board1.printBoard();
    }

    const checkForWin = (board, player) => {
        const playerMarker = player.token;
        // for rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0].getValue() === playerMarker &&
                board[i][1].getValue() === playerMarker &&
                board[i][2].getValue() === playerMarker
                ) {
                console.log(`${player.getPlayerName()} Won!!`);
                return;
            }
        }

        // for columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i].getValue() === playerMarker &&
                board[1][i].getValue() === playerMarker &&
                board[2][i].getValue() === playerMarker
                ) {
                console.log(`${player.getPlayerName()} Won!!`);
                return;
            }
        }

        // for diagonals
        for(let i = 0; i < 3; i++) {
            if (
                board[0][0].getValue() === playerMarker &&
                board[1][1].getValue() === playerMarker &&
                board[2][2].getValue() === playerMarker
                ) {
                console.log(`${player.getPlayerName()} Won!!`);
                return;
            }
        }
        // diagnonal 2
        for(let i = 0; i < 3; i++) {
            if (
                board[0][2].getValue() === playerMarker &&
                board[1][1].getValue() === playerMarker &&
                board[2][0].getValue() === playerMarker
                ) {
                console.log(`${player.getPlayerName()} Won!!`);
                return;
            }
        }
    }

    const playRound = (row, col) => {
        const currentPlayer = getActivePlayer();
        board1.markPlayerInput(currentPlayer, row, col);
        // win logic
        checkForWin(board1.getBoard(), currentPlayer);
        
        switchPlayerTurn();
        printNewRound();
    }
    printNewRound();

    return {
        playerOne,
        playerTwo,
        playRound,
        getActivePlayer,
        getBoard: board1.getBoard
    };
}

const ScreenController = (() => {
    const game = GameController();
    const container = document.querySelector('.container');
    const updateScreen = () => {
        container.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell.getValue() === 0 ? "" : cell.getValue();
                container.appendChild(cellButton);
                // add class for each player
                if (cellButton.textContent == game.playerOne.token) {
                    cellButton.classList.add('p1');
                } if (cellButton.textContent == game.playerTwo.token) {
                    cellButton.classList.add('p2');
                }
            })
        })
    }

    container.addEventListener('click', (e) => {
        const clickedCellRow = e.target.dataset.row;
        const clickedCellCol = e.target.dataset.column;
        if (!clickedCellCol && !clickedCellRow) {
            console.log('invalid click');
        } else {
            game.playRound(clickedCellRow, clickedCellCol);
            updateScreen();
        }
    })


    updateScreen();
})();
