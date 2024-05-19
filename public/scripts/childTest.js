import {pawnSVG} from './pieceSVGs.js'


const newDiv = document.createElement('div')
newDiv.id = "testicles2"
const oldDiv = document.getElementById('testicles')
const board = document.querySelector("#board")

createChessboard()
dragElement(document.getElementById("testicles"));

function pawn() {
fetch('../b_pawn.svg')
    .then(response => response.text())
    .then(svgString => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = svgString.trim()
        const svgElement = tempDiv.firstChild
        oldDiv.appendChild(svgElement)
    })
  }

pawn()
const containerDiv = document.createElement('div')
containerDiv.classList.add('drag')
const tempDiv = document.createElement('div')
  tempDiv.innerHTML = pawnSVG.trim()
  const svgElement = tempDiv.firstChild
  svgElement.id = "BlackPawn"
  svgElement.classList.add('drag', 'blackPiece')
  containerDiv.appendChild(svgElement)
  board.appendChild(containerDiv)

// Creating draggable fella from here works - how to get the image going    
const dragTest = document.createElement('div')
dragTest.classList.add('drag')
dragTest.id = 'dragTest'
dragTest.innerText = 'DRAGTEST'
board.appendChild(dragTest)

const draggables = document.querySelectorAll(".drag")
console.log(draggables)

for (let i = 0; i < draggables.length; i++){
    dragElement(draggables[i])
}

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
    console.log("Mouse down on doodad")
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(event) {
    console.log("Mouse drag happened")
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
  }
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




// TODO -> make it work over an existing board without freaking out the SVG files
