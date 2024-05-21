
export default function moveHandler(piece, drag) {
    console.log("moveHandler started")

    const originalTop = piece.style.top
    const originalLeft = piece.style.left

    // TODO -> generate valid squares based off piece rules
    const validSquares = ['e3', 'e4']
    let highlightedSquares = []
    for (let i = 0; i < validSquares.length; i++) {
        const square = document.querySelector('#'+ validSquares[i])
        const child = document.querySelector('#'+ validSquares[i]).children[0]

        child.classList.remove('hidden')
        highlightedSquares.push(square)
    }

    if (drag) {
        console.log("Drag is true")
        document.addEventListener('pointerup', handlePointerUp)
    } else {
        console.log("Drag is false")
        document.addEventListener('click', handleClick)
    }

    function handlePointerUp() {
        const dropPos = pixelsToCoord({top: piece.style.top, left: piece.style.left})
        console.log(dropPos)
        
        if (!validSquares.includes(dropPos)) {
            piece.style.top = originalTop
            piece.style.left = originalLeft
        }

        document.removeEventListener('pointerup', handlePointerUp)
        cleanUp()        
    }

    function handleClick() {
        console.log("Handled click")
        for (let element in highlightedSquares) {
            if (highlightedSquares[element].contains(event.target)) {
                const newPos = coordToPixel(highlightedSquares[element].id)

                piece.style.top = newPos.topSpace
                piece.style.left = newPos.leftSpace
                console.log("Moved piece cleanup call")
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