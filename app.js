const container = document.querySelector('.container');
// gameboard modules
const gameBoard = (()=>{
    const boardContent = [];
    const buildBoard = function() {
        const boardDiv = document.createElement('div');
        boardDiv.classList.add('boardDiv')
        for (i = 1; i <= 9; i++) {
            const box = document.createElement('div');
            box.classList.add(`box-${i}`, 'box-div')
            boardDiv.append(box);
        }
        container.append(boardDiv);
    }

    const renderBoard = () => {
        buildBoard();
    }
    return {
        renderBoard, boardContent
    };
})();

gameBoard.renderBoard();

let boxes = document.querySelectorAll('.box-div');
boxes = Array.from(boxes);

boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (e.target.textContent === '') {
            const inputArray = gameBoard.boardContent;
            if (inputArray.length === 0) {
                inputArray.push('X');
                box.textContent = "X";
                box.classList.add('p1');
            } else if (inputArray[inputArray.length - 1] == 'O') {
                inputArray.push('X');
                box.textContent = "X";
                box.classList.add('p1');
            } else {
                inputArray.push('O');
                box.textContent = "O";
                box.classList.add('p2');
            }
        } else {
            console.log('We are not empty');
        }
        
    })
});


// winning logic

const example = () => {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; j < column; j++) {
        board[i].push(Cell());
        }
    }

    const markPlayerInput = (player, row, col) => {
        const playerSpot = board[row][col];
        // checks if cell is empty
        if (playerSpot.getValue() == 0) {  // convert to ternary operator
            playerSpot.addPlayerMark(player.token);
        } else {
            console.log('this cell is not empty');
        }
    }

    const printBoard = () => {
        const boardWithValue = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithValue)
    }

    return {markPlayerInput, printBoard};
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

    const board1 = example();

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board1.printBoard();
    }

    const playRound = (row, col) => {
        board1.addPlayerMark(getActivePlayer(), row, col);

        // Win logic
        switchPlayerTurn();
        printNewRound();
    }
    printNewRound();

    return {playRound, getActivePlayer};
}





// console.log(board);

