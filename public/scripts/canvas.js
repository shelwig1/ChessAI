// canvasScript.js
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('myCanvas');
    canvas.width = 1500
    canvas.height = 1500

    const ctx = canvas.getContext('2d');
  
    const scale = .66

    //renderBoard(ctx)
    
    const pawnContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.73 292.27"><defs><style>.cls-1{stroke:#e6e6e6;stroke-linecap:round;stroke-width:14px;}</style></defs><title>b_pawn_svg_NoShadow</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M118.86,7C97.37,7,80,23.33,80,43.49a35.13,35.13,0,0,0,7.59,21.71c-19,10.22-31.91,29.29-31.91,51.27,0,18.52,9.14,35,23.44,45.89C49.9,172,7,213,7,285.27H230.73c0-72.26-42.9-113.22-72.08-122.9,14.3-10.86,23.44-27.37,23.44-45.89,0-22-12.94-41.06-31.91-51.27a35.13,35.13,0,0,0,7.59-21.71C157.77,23.33,140.36,7,118.86,7Z"/></g></g></svg>'
    const pawnBlob = new Blob([pawnContent], {type: 'image/svg+xml'})
    const pawnURL = URL.createObjectURL(pawnBlob)
    const pawnImage = new Image()
    pawnImage.src = pawnURL

    pawnImage.onload = function() {
      const element = {
        x: 165,
        y: 0,
        width: pawnImage.width,
        height: pawnImage.height,
        image: pawnImage
      }
      let isMouseDown = false;
      let initialMouseX = 0;
      let initialMouseY = 0;
  
      // Add event listeners
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
  
      // Function to handle mouse down event
      function handleMouseDown(event) {
          isMouseDown = true;
          initialMouseX = event.clientX - canvas.offsetLeft;
          initialMouseY = event.clientY - canvas.offsetTop;
      }
  
      // Function to handle mouse move event
      function handleMouseMove(event) {
          if (isMouseDown) {
              const currentMouseX = event.clientX - canvas.offsetLeft;
              const currentMouseY = event.clientY - canvas.offsetTop;
              const deltaX = currentMouseX - initialMouseX;
              const deltaY = currentMouseY - initialMouseY;
              element.x += deltaX;
              element.y += deltaY;
              initialMouseX = currentMouseX;
              initialMouseY = currentMouseY;
              redrawCanvas();
          }
      }
  
      // Function to handle mouse up event
      function handleMouseUp() {
          isMouseDown = false;
      }
  
      // Function to redraw the canvas
      async function redrawCanvas() {
          //ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(element.image, element.x, element.y, element.width, element.height);
          await renderBoard(ctx)




      }
  
      // Initial redraw
      redrawCanvas();
    };
//      function redrawCanvas(){
  //      ctx.drawImage(pawn.image, pawn.x, pawn.y, pawn.width, pawn.height);
      }
    


  );

 

//TODO - board size is determined by users screen size, squareSize is determined by board size
function renderBoard(ctx) {
  const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 450"><defs><style>.cls-1{fill:#512a2a;}</style></defs><title>square brown dark_svg</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect class="cls-1" width="450" height="450"/></g></g></svg>'

  const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'})

  const svgURL = URL.createObjectURL(svgBlob)

  const svgImage = new Image()
  svgImage.src = svgURL

  svgImage.onload = () => {
    console.log("Board square size:", svgImage.width, " ", svgImage.height)
    let pointerX = 0
    let pointerY = 0
    let flipper = false
    const squareSize = svgImage.width

    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 9; j++) {
        if (j % 2 == 0) {
          ctx.drawImage(svgImage, pointerX, pointerY, squareSize , squareSize)
        }
          pointerX += squareSize
      }

      pointerX = 0
      pointerY += squareSize

      for (let k = 1; k < 9; k++) {
        if (k % 2 != 0) {
          ctx.drawImage(svgImage, pointerX, pointerY, squareSize , squareSize)
        }
        pointerX += squareSize
      }

      pointerX = 0
      pointerY += squareSize
    }
  }
  return 0
}