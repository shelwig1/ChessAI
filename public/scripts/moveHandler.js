/*
BUGS

- can put pieces in the wrong spot by click and dragging rapidly
*/


export default function moveHandler(piece, drag) {
    console.log("moveHandler started")

    const originalTop = piece.style.top
    const originalLeft = piece.style.left

    // TODO -> generate valid squares based off piece rules
    const validSquares = generateValidMoves(piece)
    //const validSquares = ['e3', 'e4']

    let highlightedSquares = []
    for (let i = 0; i < validSquares.length; i++) {
        /* const square = document.querySelector('#'+ validSquares[i])
        const child = document.querySelector('#'+ validSquares[i]).children[0] */
        const square = document.getElementById(validSquares[i])
        const child = document.getElementById(validSquares[i]).children[0]
        console.log("CHILD: ", child)

        child.classList.remove('hidden')
        highlightedSquares.push(square)
    }

    if (drag) {
        //console.log("Drag is true")
        document.addEventListener('pointerup', handlePointerUp)
    } else {
        //console.log("Drag is false")
        document.addEventListener('click', handleClick)
    }

    function handlePointerUp() {
        const dropPos = pixelsToCoord({top: piece.style.top, left: piece.style.left})
        //console.log(dropPos)
        
        if (!validSquares.includes(dropPos)) {
            piece.style.top = originalTop
            piece.style.left = originalLeft
        } else {
            piece.setAttribute('data-moved', 'true')
        }

        document.removeEventListener('pointerup', handlePointerUp)
        cleanUp()        
    }

    function handleClick() {
        //console.log("Handled click")
        for (let element in highlightedSquares) {
            if (highlightedSquares[element].contains(event.target)) {
                const newPos = coordToPixel(highlightedSquares[element].id)

                piece.style.top = newPos.topSpace
                piece.style.left = newPos.leftSpace
                piece.setAttribute('data-moved', 'true')

                //console.log("Moved piece cleanup call")
            }
        }
        document.removeEventListener('click', handleClick)
        cleanUp()
    }

    function cleanUp() {
        for (let i in highlightedSquares) {
            const child = highlightedSquares[i].children[0]
            child.classList.add('hidden')
        }
    }
}

function pixelsToCoord(data) {
    // Take the pixel data in form of object
    const letters = ['a','b','c','d','e','f','g','h']

    const left = letters[Math.round(parseInt(data.left) / 50)]
    const top = 8 - (Math.round(parseInt(data.top) / 50))
    return (left + top)
}

function coordToPixel(data) {
    const letters = ['a','b','c','d','e','f','g','h']
    
    const letter = data.charAt(0)
    const number = data.charAt(1)

    const leftSpace = letters.indexOf(letter) * 50 + 'px'
    const topSpace = (8 - number) * 50 + 'px'

    return ({topSpace, leftSpace})
}

function generateValidMoves(piece) {
    // Pawn - forward
    // Queen - horizontal, diagonal, 1 square around
    // Knight - L shape
    // Rook - horizontal
    // Bishop - diagonal
    // King - 1 square around

    // TODO -> how to handle team -> invert the directions we look for "forward"


    // Push to this array as we go through, then finish and return
    let validSquares = []
    const pieceType = piece.getAttribute('data-piece')
    const team = piece.getAttribute('data-team')
    //const startingPos = pixelsToCoord({top: piece.style.top, left: piece.style.left})
    //const startingCol = startingPos.charAt(0)
    //const startingRow = startingPos.charAt(1)
    const moved = "true" === piece.getAttribute('data-moved')


    // Number based index

    const startSquare = piece.getAttribute('data-square')


    pawn()
    // pawn
    //  Two on initial move
    //  One on subsequent moves
    //  En-passant goodies
    function pawn() {
    /* EDGE CASES
    - on reaching the enemy start rank, we can click and drag anywhere
    
    TODO -> implement promotions
    */

    // TODO -> ATTACKS ON PIECES
        if (!moved) {
            // take current pos and move 2 ranks "forward"
            /*  Using chess notation for squares
            for (let i = 1; i < 3; i++) {
                //console.log("Valid squares include: ", startingCol + (parseInt(startingRow) + i))
                validSquares.push(startingCol + (parseInt(startingRow) + i))
            } */

            for (let i = 1; i < 3; i++) {
                validSquares.push(parseInt(startSquare) - 8 * i)
                console.log("Valid square: ", parseInt(startSquare) - 8 * i)
            }
        } else { 
            validSquares.push(parseInt(startSquare) - 8)
        }
    }
    // horizontalCast

    function horizontalCast() {
        // take col, iterate through all given places
        // if blocked, stop
        // left until blocked
        const letters = ['a','b','c','d','e','f','g','h']

        for (let i = letters.indexOf(startingCol) + 1; i > 0; i--) {
            // is the space occupied?
                // We can have a thing on the main file that has a board representation, check what we got
        }
        
        // right until blocked
        // foward until blocked
        // backward until blocked
        

        // take row, iterate through all given places
    }
    // diagonalCast

    // oneAround

    // knightAsshole

    // Check rules
        // Are any of these moves off the board?
        // Before the move, can I physically get there?
        // After the move, would I be in check?
    return validSquares
}