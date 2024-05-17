import setup from './setupBoard.js'

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


function addPawn() {
    const square = document.querySelector('#a1')
    
    fetch('../b_pawn.svg')
        .then(response => response.text())
        .then(svgString => {
            const tempDiv = document.createElement('div')
            tempDiv.innerHTML = svgString.trim()

            const svgElement = tempDiv.firstChild
            const containerDiv = document.createElement('div')
            containerDiv.classList.add('drag')
            containerDiv.id = "BlackPawn"
            containerDiv.appendChild(svgElement)
            board.appendChild(containerDiv)

        })
        .catch(error => console.error('Error fetching SVG:', error))
    console.log("Made within add pawn:" ,document.querySelectorAll(".drag"))
    test()
}

/* document.addEventListener("DOMContentLoaded", function() {


/*   const board = document.querySelector('.board')
  console.log(board)
  const square = document.querySelector('#a1')
  console.log(square)
  const pawn = document.querySelector('#BlackPawn')
  console.log(pawn)
 

}) */

function test(){
  
  const tempDiv = document.createElement('div')
  tempDiv.classList.add('drag')
  tempDiv.innerText = 'TEST DIV'
  board.appendChild(tempDiv)
  console.log(document.getElementById("BlackPawn"))
  console.log("Drag attempt" ,document.getElementsByClassName('.drag'))
}

setup()
createChessboard();
addPawn()



// Doesn't work when it's done within a fetch block