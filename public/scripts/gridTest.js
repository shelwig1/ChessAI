// Define grid dimensions
const rows = 5;
const columns = 5;
const cellWidth = canvas.width / columns;
const cellHeight = canvas.height / rows;

// Function to snap piece to grid position
function snapToGrid(x, y) {
    const gridX = Math.floor(x / cellWidth) * cellWidth + cellWidth / 2;
    const gridY = Math.floor(y / cellHeight) * cellHeight + cellHeight / 2;
    return { x: gridX, y: gridY };
}

// Example piece position
const piecePosition = { x: 100, y: 150 };

// Snap piece to grid position
const snappedPosition = snapToGrid(piecePosition.x, piecePosition.y);

console.log('Snapped position:', snappedPosition);

