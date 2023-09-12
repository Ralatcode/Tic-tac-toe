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
    
    let playerType = null;

    const updatePlayerType = (string) => playerType = string;
    
    const getPlayerType = () => playerType;

    return {
        player,
        token,
        getPlayerName,
        updatePlayerName,
        playerScoreIncrement,
        playerScoreReset,
        getPlayerScore,
        updatePlayerType,
        getPlayerType
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
        winResult = false;
        drawResult = false;
        roundWinner = null;
        winPattern = [];
        activePlayer = getFirstPlayer();
    }

    const restartGame = () => {
        winResult = false;
        drawResult = false;
        roundWinner = null;
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

    const AIcheckWin = (board, player) => {
        const playerMarker = player.token;
        // for rows
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] === playerMarker &&
                board[i][1] === playerMarker &&
                board[i][2] === playerMarker
                ) {
                return true;
            }
        }

        // for columns
        for (let i = 0; i < 3; i++) {
            if (
                board[0][i] === playerMarker &&
                board[1][i] === playerMarker &&
                board[2][i] === playerMarker
                ) {
                return true;
            }
        }

        // for diagonals
        for(let i = 0; i < 3; i++) {
            if (
                board[0][0] === playerMarker &&
                board[1][1] === playerMarker &&
                board[2][2] === playerMarker
                ) {
                return true;
            }
        }
        // diagnonal 2
        for(let i = 0; i < 3; i++) {
            if (
                board[0][2] === playerMarker &&
                board[1][1] === playerMarker &&
                board[2][0] === playerMarker
                ) {
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

    const getEmptyCell = () => {
        const newBoard = board1.getBoard();
        const cellsArray = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // empty cells
                if (newBoard[i][j].getValue() === 0) {
                    const index = [i, j];
                    cellsArray.push(index);
                } 
            }
        }
        return cellsArray;
    }

    const AIPlayer = () => {
        const currentPlayer = getActivePlayer();
        if (currentPlayer.getPlayerType() === 'AI') {
            console.log('player is ai..');
            const availableCells = getEmptyCell();
            if (availableCells === []) {
                console.log('no space');
                return false;
                // checks if there is a winner already
            } else if (getWinStatus()){ 
                console.log('someone-won. dont play');
                return false;
            } else if (availableCells.length >= 1) {
                const boardNew = getAIBoard(board1.getBoard());
                const aiMove = bestMove(boardNew);
                // const firstItem = availableCells[0];
                playRound(aiMove.row, aiMove.col);
                return true;
            }
        }
    }

    const getAIBoard = (board) => {
        const AIBoard = [];
        for (let i = 0; i < board.length; i++) {
            AIBoard[i] = [];
            for (let j = 0; j < board[i].length; j++) {
                AIBoard[i][j] = board[i][j].getValue();
            }
        }
        return AIBoard;
    }

    const getAIBoardCell = (boardName) => {
        const cellsArray = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // empty cells
                if (boardName[i][j] === 0) {
                    const index = [i, j];
                    cellsArray.push(index);
                } 
            }
        }
        return cellsArray;
    }

    const minimax = (board, depth, isMaximizing) => {

        const humanPlayer = playerOne;
        const aiPlayer = playerTwo;
        
        const availableCells = getAIBoardCell(board);

        

        if (AIcheckWin(board, humanPlayer)) {
            return -1;
        } else if (AIcheckWin(board, aiPlayer)) {
            return 1;
        } else if (availableCells.length === 0) {
            return 0; 
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                  board[i][j] = aiPlayer.token;
                  let score = minimax(board, depth + 1, false);
                  board[i][j] = 0;
                  bestScore = Math.max(score, bestScore);
                }
              }
            }
            return bestScore;
          } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                  board[i][j] = humanPlayer.token;
                  let score = minimax(board, depth + 1, true);
                  board[i][j] = 0; 
                  bestScore = Math.min(score, bestScore);
                }
              }
            }
            return bestScore;
          }
    }

    // Function to find the best move for the AI player using Minimax
    function bestMove(board) {
        let bestScore = -Infinity;
        let move = { row: -1, col: -1 };

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
              board[i][j] = playerTwo.token;
              let score = minimax(board, 0, false);
              board[i][j] = 0;
              if (score > bestScore) {
                bestScore = score;
                move.row = i;
                move.col = j;
              }
            }
          }
        }
    
        return move;
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
        // display results and restarts round on win or draw
        if (winResult || drawResult) {
            return false;
        } else {
            switchPlayerTurn();
            printNewRound();
            AIPlayer();
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
        AIPlayer,
        restartGame,
        restartRound
    };
}

const ScreenController = (() => {
    const game = GameController();
    const interfaceDiv = document.querySelector('.interface-div');
    const container = document.querySelector('.container');
    const switchPlayerBtn = document.querySelector('.switch-turn');
    const changePlayerNameBtn = document.querySelector('.change-name');
    const updateNameModal = document.querySelector('.update-name-modal');
    const screenPlayerName = document.querySelector('#name-input');
    const nameForm = document.querySelector('.update-name-modal > form');
    const resultDisplay = document.querySelector('.modal-text');
    const startBtn = document.querySelector('.start');
    const introModal = document.querySelector('.intro-box');
    const modal = document.querySelector('.modal-box');
    let playerTypes = document.querySelectorAll('.player-type');
    let playerTwobtns = document.querySelectorAll('.player-type > .player-Two');
    playerTwobtns = Array.from(playerTwobtns);

    playerTypes = Array.from(playerTypes);

    const updateScreen = () => {
        container.textContent = '';
        resultDisplay.textContent = '';
        const board = game.getBoard();
        const win = game.getWinStatus();
        const draw = game.getDrawStatus();
        game.AIPlayer();
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

        if (win || draw) {
            displayResult();
        }
    }

    const displayResult = () => {
        const win = game.getWinStatus();
        const draw = game.getDrawStatus();
        const winnerName = game.getRoundWinner();
        console.log(`win is ${win} draw is ${draw}, winner result is ${winnerName}`)
        if (win) {
            console.log('display-result ran');
            resultDisplay.textContent = `${winnerName} Won !!`;
            modal.classList.add('open');

        } else if (draw) {
            resultDisplay.textContent = "It's a tie..."
            modal.classList.add('open');
        }

    }

    const removeModal = () => {
        game.restartRound();
        updateScreen();
        modal.classList.remove('open');
        checkGameWinner();
    }

    const continueBtn = document.querySelector('.continue-game');
        continueBtn.addEventListener('click', removeModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            removeModal();
        }
    });

    const checkGameWinner = () => {
        const playerOne = game.playerOne;
        const playerTwo = game.playerTwo;
        const winnerModal = document.querySelector('.game-winner-box');
        const winnerModalH3 = document.querySelector('.winner-h3');
        const restartBtn = document.querySelector('.restart-game');
        console.log(`player one is ${playerOne.getPlayerScore()} and playertwo is ${playerTwo.getPlayerScore()}`)
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


    const checkDOMPlayerType = () => {

        playerTwobtns.forEach(p2Btn => {
            if (p2Btn.classList.contains('active')) {
                if (p2Btn.classList.contains('player-selected')) {
                    game.playerTwo.updatePlayerType('Human');
                } else if (p2Btn.classList.contains('ai-selected')) {
                    game.playerTwo.updatePlayerType('AI');
                }
            } else {
                return false;
            }
        })
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
        checkDOMPlayerType();
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
        }
    })


    changePlayerNameBtn.addEventListener('click', () => {
        screenPlayerName.value = game.playerOne.getPlayerName();
        updateNameModal.classList.add('show');
    })


    // toggle playertype for p1 and p2 active playertype
    playerTypes.forEach(playerType => {
        playerType.addEventListener('click', (e) => {
            const parentNode = e.target.parentNode;
            if (parentNode.classList.contains('p1')) {
                playerOnebtns.forEach(p1Btn => {
                    p1Btn.classList.remove('active');
                    if (e.target === p1Btn) {
                        p1Btn.classList.add('active');
                    }
                })
            } else if (parentNode.classList.contains('p2')) {
                playerTwobtns.forEach(p2Btn => {
                    p2Btn.classList.remove('active');
                    if (e.target === p2Btn) {
                        p2Btn.classList.add('active');
                    }
                })
            }
        });
    })


})();

