export function setup() {
    console.log("hello from the module")
    //createChessboard()
}

let pawnImage;

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

// We don't need to make this an async, we can just pre stash the files in a thing we import into the main script
export async function fetchPawn() {
  //const square = document.querySelector('#a1')
  
  await fetch('../b_pawn.svg')
      .then(response => response.text())
      .then(svgString => {
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = svgString.trim()

          const svgElement = tempDiv.firstChild
          /* const containerDiv = document.createElement('div')
          containerDiv.classList.add('drag')
          containerDiv.id = "BlackPawn"
          containerDiv.appendChild(svgElement)
          board.appendChild(containerDiv)
 */ 
         console.log("SVGELEMENT: ", svgElement)
          pawnImage = svgElement
          console.log("Pawnimage within the fetchPawn: ", pawnImage)
        })
      .catch(error => console.error('Error fetching SVG:', error))
//  console.log("Made within add pawn:" ,document.querySelectorAll(".drag"))
  //test()
  addPawn()
  
  return (pawnImage)
}

function addPawn() {
  console.log("addPawn in setupBoard triggered")
  const board = document.querySelector(".board")

  pawnImage.classList.add('drag')
/*   const containerDiv = document.createElement('div')
  containerDiv.classList.add('drag')
  containerDiv.id = "BlackPawn"
  containerDiv.appendChild(pawnImage)
  board.appendChild(containerDiv) */
  board.appendChild(pawnImage)
  
  const parentElement = document.querySelector('.board');
  const childElement = document.querySelector('.drag');
  console.log("Relative position test: ", getRelativePosition(childElement, parentElement))
}

function getRelativePosition(child, parent) {
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  // Calculate relative coordinates
  const relativeTop = childRect.top - parentRect.top;
  const relativeLeft = childRect.left - parentRect.left;

  return { top: relativeTop, left: relativeLeft };
}

// Get the parent and child elements


// Get the relative position