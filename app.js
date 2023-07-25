const container = document.querySelector('.container');
// gameboard modules
const gameBoard = (()=>{
    const boardContent = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const buildBoard = function() {
        const boardDiv = document.createElement('div');
        boardDiv.classList.add('boardDiv')
        for (i = 1; i <= 9; i++) {
            const box = document.createElement('div');
            box.classList.add(`box-${i}`)
            boardDiv.append(box);
        }
        container.append(boardDiv);
    }
    return {
        buildBoard
    };
})();

gameBoard.buildBoard()

