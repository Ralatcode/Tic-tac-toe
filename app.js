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
