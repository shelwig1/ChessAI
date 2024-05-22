import dragElement from './drag.js'
import moveHandler from './moveHandler.js';


function createChessboard() {
    const board = document.querySelector('.board');
    const letters = ['a','b','c','d','e','f','g','h']
    let number = 1;
    for (let row = 8; row >= 1; row--) {
      for (let col = 1; col <= 8; col++) {
        const isBlack = (row + col) % 2 === 0;
        const square = document.createElement('div');
        square.classList.add('square');
        square.classList.add(isBlack ? 'black' : 'white');
        //square.classList.add("svg-container")

        // Chess notation for board squares
        //square.textContent = letters[col - 1] + '' + row
        //square.id = letters[col - 1] + '' + row


        // Numerical notation for board squares
        square.id = number
        square.textContent = number++

        // Append square to the board
        board.appendChild(square);


        const moveDot = '<svg><circle cx="25" cy="25" r="10" fill="rgba(255, 0, 0, 0.5)" /></svg>'
  
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML =  moveDot.trim()
        const svgElement = tempDiv.firstChild
        svgElement.classList.add('moveDot')
        svgElement.classList.add('hidden')
        square.appendChild(svgElement)

        
      }
    }
  }

// Inputs: pieceType, location
// We can just make it the start configuration for now and roll from there
function addPieces(location) {
  const letters = ['a','b','c','d','e','f','g','h']

  const pawnFella = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.73 292.27"><defs><style>.cls-1{stroke:#e6e6e6;stroke-linecap:round;stroke-width:14px;}</style></defs><title>b_pawn_svg_NoShadow</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M118.86,7C97.37,7,80,23.33,80,43.49a35.13,35.13,0,0,0,7.59,21.71c-19,10.22-31.91,29.29-31.91,51.27,0,18.52,9.14,35,23.44,45.89C49.9,172,7,213,7,285.27H230.73c0-72.26-42.9-113.22-72.08-122.9,14.3-10.86,23.44-27.37,23.44-45.89,0-22-12.94-41.06-31.91-51.27a35.13,35.13,0,0,0,7.59-21.71C157.77,23.33,140.36,7,118.86,7Z"/></g></g></svg>'
  
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML =  pawnFella.trim()
  const svgElement = tempDiv.firstChild
  const pieceHolder = document.createElement('div')

  pieceHolder.classList.add('drag')

  // Dependant on piece data
  pieceHolder.setAttribute('data-piece', 'pawn');
  pieceHolder.setAttribute('data-team', 'black');

  pieceHolder.setAttribute('data-moved', 'false')

  pieceHolder.appendChild(svgElement)
  const board = document.querySelector('.board')
  board.appendChild(pieceHolder)

  // Part of the input to the function
  location = 'e2'
  pieceHolder.setAttribute('data-square', '53')
  let letter = location[0].charCodeAt(0) - 'a'.charCodeAt(0);
  let number = location[1]

  // Part of the input to the function
  pieceHolder.style.top = (8 - number) * 50 + 'px'
  pieceHolder.style.left = letter * 50 + 'px'

  // Generic
  pieceHolder.addEventListener("pointerdown",  function () {
    //let drag;
    console.log("Created event listener")

    let timerId
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('click', handleClick)

    function handlePointerDown() {
        timerId = setTimeout(handleClickAndHold, 50); 
    }
    
    function handlePointerUp() {
        clearTimeout(timerId);
    }
    
    function handleClick() {
        cleanEventHandlers()
        moveHandler(pieceHolder, false)
    }
    
    function handleClickAndHold() {
        cleanEventHandlers()
        moveHandler(pieceHolder, true)
      }

    function cleanEventHandlers(){ 
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('click', handleClick)
      //console.log("REMOVED EVENT LISTENERS")
    }
  })
}

//setup()
createChessboard();
addPieces()
addMoveDot()
const draggables = document.querySelectorAll('.drag')

for (let i = 0; i < draggables.length; i++){
  dragElement(draggables[i])
} 


function addMoveDot() {  
  const moveDot = '<svg><circle cx="25" cy="25" r="10" fill="rgba(255, 0, 0, 0.5)" /></svg>'
  
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML =  moveDot.trim()
  const svgElement = tempDiv.firstChild
  svgElement.classList.add('moveDot')
  
  const square = document.getElementById("f3")
  console.log(square)
  //square.appendChild(svgElement)

}

