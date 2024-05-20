
export default function moveHandler(piece) {
    // Get the piece type
    // is it my team?

    // Curr location

    const validSquares = ['e3', 'e4']
    let highlightedSquares = []
    for (let i = 0; i < validSquares.length; i++) {
        const square = document.querySelector('#'+ validSquares[i])
        const child = document.querySelector('#'+ validSquares[i]).children[0]

        // Add a listener that checks for clicks outside of what we're doing
        // When it fires, add hidden back to the fellas
        child.classList.remove('hidden')
        //highlightedSquares.push(child)
        highlightedSquares.push(square)
    }
    document.addEventListener('click', pointerDown)

    function pointerDown(){
        // Check if the piece is fucking uhhhh clicked
        /* document.addEventListener("pointerup", function() {
            console.log("POinter went up!")
        }) */
        
        // Need to add a timer to prevent both of these bad larry's from firing at the same time
        document.addEventListener("pointerup", cleanUp())


        for (let element in highlightedSquares) {
            //console.log(highlightedSquares[element])
            if (highlightedSquares[element].contains(event.target)) {
                const newPos = coordToPixel(highlightedSquares[element].id)

                piece.style.top = newPos.topSpace
                piece.style.left = newPos.leftSpace

                // TODO -> need to add check valid move functions

                cleanUp()
            }
        }

        if (piece.contains(event.target)) {
            console.log("Clicked on the piece")
        } else {
            cleanUp()
        }
        // Fallback condition
        //cleanUp()

        function cleanUp() {
            console.log("Did cleanup")
            for (let i in highlightedSquares) {
                const child = highlightedSquares[i].children[0]
                child.classList.add('hidden')
                //console.log(highlightedSquares[i].children[0])
            }
            document.removeEventListener('pointerdown', pointerDown)
            
            // List all current event listeners on an element
            console.log("Removed event listener")
        }
    }
}


      /*   document.addEventListener('click', function(event) {
            //console.log(self)
             for (let i = 0; i < highlightedSquares.length; i++) {
                const element = highlightedSquares[i]
                

                 if (element.contains(event.target) || piece.contains(event.target)) {
                    //console.log("were good")
                    if (element.contains(event.target)) {
                        console.log("we clicked on a square")
                        const boardCoord = coordToPixel(event.target.parentNode.parentNode.id)
                        console.log(boardCoord)
                        return true
                        
                    } else if (piece.contains(event.target)) {
                        console.log("Clicked the piece")
                        return true
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

} */


function pixelsToCoord(data) {
    // Take the pixel data in form of object
    console.log(data)

    const letters = ['a','b','c','d','e','f','g','h']

    const left = letters[parseInt(data.left) / 50]
    const top = 8 - (parseInt(data.top) / 50)
    return (left + top)
}

function coordToPixel(data) {
    // split it into top and bottom
    const letters = ['a','b','c','d','e','f','g','h']
    
    const letter = data.charAt(0)
    const number = data.charAt(1)
    console.log({letter, number})

    const leftSpace = letters.indexOf(letter) * 50 + 'px'
    const topSpace = (8 - number) * 50 + 'px'

    console.log(topSpace)
    return ({topSpace, leftSpace})

    // Click is precise - we need to make sure we're clicking on a square
    // Can we iterate through the squares as a sort of "valid target" plan?

}