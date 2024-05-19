import {pawnSVG} from './pieceSVGs.js'
import dragElement from './drag.js'
import moveHandler from './moveHandler.js';
//import fetchPawn from './setupBoard.js'


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


        const moveDot = '<svg><circle cx="25" cy="25" r="10" fill="rgba(255, 0, 0, 0.5)" /></svg>'
  
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML =  moveDot.trim()
        const svgElement = tempDiv.firstChild
        svgElement.classList.add('moveDot')
        svgElement.classList.add('hidden')
        square.appendChild(svgElement)

        
      }
    }
    /* const highlightHolder = document.createElement('div')
    highlightHolder.id = 'highlightHolder'
    board.appendChild(highlightHolder) */
  }

// Inputs: pieceType, location
function addPieces(location) {
  const letters = ['a','b','c','d','e','f','g','h']

  const pawnFella = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.73 292.27"><defs><style>.cls-1{stroke:#e6e6e6;stroke-linecap:round;stroke-width:14px;}</style></defs><title>b_pawn_svg_NoShadow</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M118.86,7C97.37,7,80,23.33,80,43.49a35.13,35.13,0,0,0,7.59,21.71c-19,10.22-31.91,29.29-31.91,51.27,0,18.52,9.14,35,23.44,45.89C49.9,172,7,213,7,285.27H230.73c0-72.26-42.9-113.22-72.08-122.9,14.3-10.86,23.44-27.37,23.44-45.89,0-22-12.94-41.06-31.91-51.27a35.13,35.13,0,0,0,7.59-21.71C157.77,23.33,140.36,7,118.86,7Z"/></g></g></svg>'
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML =  pawnFella.trim()
  const svgElement = tempDiv.firstChild
  const pieceHolder = document.createElement('div')

  pieceHolder.classList.add('drag')
  pieceHolder.classList.add('blackPiece')
  pieceHolder.classList.add('pawn')

  pieceHolder.id = 'BlackPawn'
  pieceHolder.appendChild(svgElement)
  const board = document.querySelector('.board')
  board.appendChild(pieceHolder)

  location = 'e2'
  let letter = location[0].charCodeAt(0) - 'a'.charCodeAt(0);
  let number = location[1]

  pieceHolder.style.top = (8 - number) * 50 + 'px'
  pieceHolder.style.left = letter * 50 + 'px'

  pieceHolder.addEventListener("click", function () {
    console.log("Clicked a piece")
    moveHandler(pieceHolder)
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
//fetchPawn();
//addPawn()

// So this shit doesn't work in a function
/* 
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
      console.log("Made dragable ", elmnt)
  }

function dragMouseDown(event) {
      event = event || window.event;
      event.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = event.clientX;
      pos4 = event.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
  }

function elementDrag(event) {
      event = event || window.event;
      event.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - event.clientX;
      pos2 = pos4 - event.clientY;
      pos3 = event.clientX;
      pos4 = event.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      snap()
      }

function snap() {
  const child = elmnt.getBoundingClientRect()
  const board = document.querySelector('.board')
  const parent = board.getBoundingClientRect()

  let relativePos = {
    top: child.top - parent.top,
    left: child.left - parent.left
  }
  console.log("Relative pos: ", relativePos)
  let relativeTop = Math.round((child.top - parent.top) / 50)  * 50
  let relativeLeft = Math.round((child.left - parent.left) / 50)  * 50

  elmnt.style.top = relativeTop + 'px'
  elmnt.style.left = relativeLeft + 'px'
  }
  
} */
