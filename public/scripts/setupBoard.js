export default function setup() {
    console.log("hello from the module")
    //createChessboard()
}

function createChessboard() {
    const board = document.querySelector('.board');
    const letters = ['a','b','c','d','e','f','g','h']
    for (let row = 8; row >= 1; row--) {
      for (let col = 1; col <= 8; col++) {
        const isBlack = (row + col) % 2 === 0;
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add(isBlack ? 'black' : 'white');
        //square.classList.add("svg-container")

        //square.textContent = letters[col - 1] + '' + row
        square.id = letters[col - 1] + '' + row
        // Append square to the board
        board.appendChild(square);
      }
    }
  }
