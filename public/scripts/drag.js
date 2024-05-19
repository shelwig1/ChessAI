// Should I create a class for this?

export default function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
        //console.log("Made dragable ", elmnt)
    }

function dragMouseDown(event) {
        event = event || window.event;
        //console.log("Mouse down on doodad")
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
    //console.log("Relative pos: ", relativePos)
    let relativeTop = Math.round((child.top - parent.top) / 50)  * 50
    let relativeLeft = Math.round((child.left - parent.left) / 50)  * 50

    if (relativeTop > 350) { relativeTop = 350}
    if (relativeLeft > 350) {relativeLeft = 350}
    
    elmnt.style.top = relativeTop + 'px'
    elmnt.style.left = relativeLeft + 'px'

    //console.log("New position: ", relativeTop, " ", relativeLeft)
    }

}



