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
            svgElement.id = "Black-Pawn"
            svgElement.classList.add("drag")
            svgElement.draggable = true
            
            svgElement.addEventListener("mousedown", function(event) {
                if (event.currentTarget === svgElement) {
                    console.log("yipee")
                }
            })
            square.appendChild(svgElement)
        })
        .catch(error => console.error('Error fetching SVG:', error))

    //square.textContent = "HERE"
}

  // Call the function to create the chessboard
document.addEventListener("DOMContentLoaded", function() {
  createChessboard();
  addPawn()
  //console.log(document.querySelectorAll('.drag'));      // NodeList
  const square = document.getElementById('a2')
  const pawn = document.getElementById("Black-Pawn")
  console.log(square, " ", pawn)
  square.appendChild(pawn)
})

// Can I just reparent to move these fuckers around?