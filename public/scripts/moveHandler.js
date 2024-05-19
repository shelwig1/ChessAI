
export default function moveHandler(piece) {
    // Get the piece type
    // is it my team?

    // Curr location
    const top = piece.style.top
    const left = piece.style.left
    //console.log(pixelsToCoord({top, left}))

    //what moves are valid?
    
    //Assume we're just dealing with a pawn right now
    // from f3, both f4 and f5 and valid

    // up either 50 or 100 pixels

    // What are the two squares that are valid?

    // Valid rule is one and two squares ahead
    const validSquares = ['e3', 'e4']
    let highlightedSquares = []
    for (let i = 0; i < validSquares.length; i++) {
        // find the valid squares in the DOM
        //console.log(validSquares[i])
        //console.log(document.querySelector('#'+ validSquares[i]).children)
        const child = document.querySelector('#'+ validSquares[i]).children[0]
        //console.log(child)

        // Add a listener that checks for clicks outside of what we're doing
        // When it fires, add hidden back to the fellas
        child.classList.remove('hidden')
        highlightedSquares.push(child)

        document.addEventListener('click', function(event) {
            console.log("Document event listener for clicks")
             for (let i = 0; i < highlightedSquares.length; i++) {
                const element = highlightedSquares[i]
                
                if (element.contains(event.target) || piece.contains(event.target)) {
                    console.log("were good")
                    if (element.contains(event.target)) {
                        console.log("we clicked on a square")
                        // Move our guy to the correct area and clean up
                        
                        // Get the id of the square we clicked on
                        const boardCoord = coordToPixel(event.target.parentNode.parentNode.id)
                        console.log(boardCoord)
                    }
                    
                    return true
                }
            }
            console.log("Bad click")
            
            for (let i = 0; i < highlightedSquares.length; i++) {
                const element = highlightedSquares[i]
                element.classList.add('hidden')
            }
    
        })
    }

    // If we clicked on a valid square, move us there
    // If we clicked on the piece, make it go away anyway


    // display valid move checks
    //console.log(coords)
    
}


function pixelsToCoord(data) {
    // Take the pixel data in form of object
    const letters = ['a','b','c','d','e','f','g','h']

    const left = letters[parseInt(data.left) / 50]
    const top = 8 - (parseInt(data.top) / 50)
    return (left + top)
}

function coordToPixel(data) {
    // split it into top and bottom
    const letter = data.charAt(0)
    const number = data.charAt(1)
    console.log({letter, number})

    // Click is precise - we need to make sure we're clicking on a square
    // Can we iterate through the squares as a sort of "valid target" plan?

}