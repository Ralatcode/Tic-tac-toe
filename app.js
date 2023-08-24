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
        if (playerSpot.getValue() === 0) {
            playerSpot.addPlayerMark(player.token);
            return true;
        } else {
            console.log('this cell is not empty');
            return false;
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                //  reset all player mark to zero
                board[i][j].addPlayerMark(0);
            }
        }
    }

    const printBoard = () => {
        const boardWithValue = board.map((row) => row.map((cell) => cell.getValue()))
    }

    return {
        getBoard,
        markPlayerInput,
        resetBoard,
        printBoard
    };
}



function Cell() {
    let value = 0;

    const addPlayerMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addPlayerMark,
        getValue
    };
}

// player factory function
const Players = (player, token) => {
    let playerName = player;
    let playerScore = 0;

    const updatePlayerName = (playerInput) => playerName = playerInput;
    
    const getPlayerName = () => playerName;

    const playerScoreIncrement = () => playerScore++;
    const playerScoreReset = () => playerScore = 0;

    const getPlayerScore = () => playerScore;

    return {
        player,
        token,
        getPlayerName,
        updatePlayerName,
        playerScoreIncrement,
        playerScoreReset,
        getPlayerScore
    };
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

    let firstPlayer = players[0];

    const updateFirstPlayer = (newFirstPlayer) => {
        firstPlayer = newFirstPlayer;
    };

    const getFirstPlayer = () => firstPlayer;

    const printNewRound = () => {
        board1.printBoard();
    }

    let winResult = false;
    let drawResult = false;

    let winPattern = [];

    let roundWinner = null;

    const getRoundWinner = () => roundWinner;

    const getWinStatus = () => winResult;

    const getDrawStatus = () => drawResult;
    const getWinPattern = () => winPattern;

    const restartRound = () => {
        board1.resetBoard();
        winPattern = [];
        activePlayer = getFirstPlayer();
    }

    const restartGame = () => {
        winResult = false;
        drawResult = false;
        playerOne.playerScoreReset();
        playerTwo.playerScoreReset();
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
                roundWinner = player.getPlayerName();
                player.playerScoreIncrement();
                winPattern.push([i,0]);
                winPattern.push([i,1]);
                winPattern.push([i,2]);
                console.log(winPattern);
                return true;
            }
        }

        // for columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i].getValue() === playerMarker &&
                board[1][i].getValue() === playerMarker &&
                board[2][i].getValue() === playerMarker
                ) {
                winPattern.push([0,i]);
                winPattern.push([1,i]);
                winPattern.push([2,i]);
                console.log(winPattern);
                roundWinner = player.getPlayerName();
                player.playerScoreIncrement();
                return true;
            }
        }

        // for diagonals
        for(let i = 0; i < 3; i++) {
            if (
                board[0][0].getValue() === playerMarker &&
                board[1][1].getValue() === playerMarker &&
                board[2][2].getValue() === playerMarker
                ) {
                winPattern.push([0,0]);
                winPattern.push([1,1]);
                winPattern.push([2,2]);
                console.log(winPattern);
                roundWinner = player.getPlayerName();
                player.playerScoreIncrement();
                return true;
            }
        }
        // diagnonal 2
        for(let i = 0; i < 3; i++) {
            if (
                board[0][2].getValue() === playerMarker &&
                board[1][1].getValue() === playerMarker &&
                board[2][0].getValue() === playerMarker
                ) {
                winPattern.push([0,2]);
                winPattern.push([1,1]);
                winPattern.push([2,0]);
                console.log(winPattern);
                roundWinner = player.getPlayerName();
                player.playerScoreIncrement();
                return true;
            }
        }

        return false;
    }

    const checkForDraw = () => {
        const newBoard = board1.getBoard();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (newBoard[i][j].getValue() === 0) {
                    // if any cell is empty
                    return false;
                }
            }
        }
        // all cell filled, and no empty.
        return true;
    }

    const playRound = (row, col) => {
        const currentPlayer = getActivePlayer();
        const boardInput = board1.markPlayerInput(currentPlayer, row, col);

        if (boardInput) {
            // win logic
            winResult = checkForWin(board1.getBoard(), currentPlayer);
            // only check for draw if there is no winner
            if (!winResult) {
                drawResult = checkForDraw();
            }
        // restarts round on win or draw
        if (winResult || drawResult) {
            restartRound();
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    }
        
    }
    printNewRound();

    return {
        playerOne,
        playerTwo,
        playRound,
        getActivePlayer,
        switchPlayerTurn,
        updateFirstPlayer,
        getBoard: board1.getBoard,
        getWinStatus,
        getDrawStatus,
        getWinPattern,
        getRoundWinner,
        restartGame
    };
}

const ScreenController = (() => {
    const game = GameController();
    const interfaceDiv = document.querySelector('.interface-div');
    const container = document.querySelector('.container');
    const modal = document.querySelector('.modal-box');
    const resultDisplay = document.querySelector('.modal-text');
    const introModal = document.querySelector('.intro-box');
    const switchPlayerBtn = document.querySelector('.switch-turn');
    const changePlayerNameBtn = document.querySelector('.change-name');
    const updateNameModal = document.querySelector('.update-name-modal');
    const screenPlayerName = document.querySelector('#name-input');
    const nameForm = document.querySelector('.update-name-modal > form');
    const startBtn = document.querySelector('.start');

    const updateScreen = () => {
        container.textContent = '';
        resultDisplay.textContent = '';
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const scoreBoardName = document.querySelector('.p1-dn');
        const pOneScore = document.querySelector('.p1-score');
        const pTwoScore = document.querySelector('.p2-score');
        scoreBoardName.textContent = game.playerOne.getPlayerName();
        pOneScore.textContent = game.playerOne.getPlayerScore();
        pTwoScore.textContent = game.playerTwo.getPlayerScore();


        const playerOneDiv = document.querySelector('.p1-scorebox');
        const playerTwoDiv = document.querySelector('.p2-scorebox');

        if (activePlayer.token === 'X') {
            playerTwoDiv.classList.remove('active');
            playerOneDiv.classList.add('active');
        } else if (activePlayer.token === 'O') {
            playerOneDiv.classList.remove('active');
            playerTwoDiv.classList.add('active');
        }

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

    const removeModal = () => {
        modal.classList.remove('open');
        checkGameWinner();
    }

    // switch player turn
    switchPlayerBtn.addEventListener('click', () => {
        const innerBox = document.querySelector('.intro-content > .inner-div');
        innerBox.classList.toggle('switch');
        game.switchPlayerTurn();
    })

    // start game
    startBtn.addEventListener('click', () => {
        introModal.classList.add('hide');
        interfaceDiv.classList.add('show');
        game.updateFirstPlayer(game.getActivePlayer());
        updateScreen();
    })

    introModal.addEventListener('transitionend', () => introModal.classList.add('display-none'));

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const player = game.playerOne;
        player.updatePlayerName(screenPlayerName.value);
        const introName = document.querySelector('#p1-name');
        introName.textContent = player.getPlayerName();
        updateNameModal.classList.remove('show');
    })

    container.addEventListener('click', (e) => {
        const clickedCellRow = e.target.dataset.row;
        const clickedCellCol = e.target.dataset.column;
        // checks if click is valid
        if (!clickedCellCol && !clickedCellRow) {
            console.log('invalid click');
        } else {
            game.playRound(clickedCellRow, clickedCellCol);
            updateScreen();
            displayResult();
        }
    })

    const displayResult = () => {
        const win = game.getWinStatus();
        const draw = game.getDrawStatus();
        const winnerName = game.getRoundWinner();
        if (win) {
            resultDisplay.textContent = `${winnerName} Won !!`;
            modal.classList.add('open');

        } else if (draw) {
            resultDisplay.textContent = "It's a tie..."
            modal.classList.add('open');
        }

        const continueBtn = document.querySelector('.continue-game');
        continueBtn.addEventListener('click', removeModal);
    }

    

    const checkGameWinner = () => {
        const playerOne = game.playerOne;
        const playerTwo = game.playerTwo;
        const winnerModal = document.querySelector('.game-winner-box');
        const winnerModalH3 = document.querySelector('.winner-h3');
        const restartBtn = document.querySelector('.restart-game');
        if (playerOne.getPlayerScore() === 3 || playerTwo.getPlayerScore() === 3) {
            winnerModal.classList.add('open');
            // checks player with highest score after one player has 3 wins
            if (playerOne.getPlayerScore() > playerTwo.getPlayerScore()) {
                winnerModalH3.textContent = `${playerOne.getPlayerName()} has won the game.`;
            } else {
                winnerModalH3.textContent = `${playerTwo.getPlayerName()} has won the game.`;
            }
        }

        restartBtn.addEventListener('click', () => {
            game.restartGame();
            interfaceDiv.classList.remove('show');
            winnerModal.classList.remove('open');
            introModal.classList.remove('hide', 'display-none');
        })
    }

    changePlayerNameBtn.addEventListener('click', () => {
        screenPlayerName.value = game.playerOne.getPlayerName();
        updateNameModal.classList.add('show');
    })

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            removeModal();
        }
    });


})();

