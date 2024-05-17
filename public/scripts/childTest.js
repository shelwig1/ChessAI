const newDiv = document.createElement('div')
newDiv.id = "testicles2"
const oldDiv = document.getElementById('testicles')

oldDiv.appendChild(newDiv)

fetch('../b_pawn.svg')
    .then(response => response.text())
    .then(svgString => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = svgString.trim()
        const svgElement = tempDiv.firstChild
        oldDiv.appendChild(svgElement)
        newDiv.appendChild(svgElement)
    })


// We can append the fella multiple times, so that's not the problem...

dragElement(document.getElementById("testicles"));


const draggables = document.querySelectorAll(".drag")
console.log("Draggables: ", draggables)

for (let i = 0; i < draggables.length; i++){
    //console.log(draggables[i])
    dragElement(draggables[i])
}

/* document.addEventListener("click", function(event) {
    console.log(event.target)
})
 */
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