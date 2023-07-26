const container = document.querySelector('.container');
// gameboard modules
const gameBoard = (()=>{
    const boardContent = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
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
        let boxes = document.querySelectorAll('.box-div');
        boxes = Array.from(boxes);

        // for (i = 0; i < boxes.length; i++) {
        //     boxes[i].textContent = boardContent[i]; 
        // }

    }
    return {
        renderBoard
    };
})();

gameBoard.renderBoard();
