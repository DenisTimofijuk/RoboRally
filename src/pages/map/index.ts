import { Grid } from '../../core/grid';
import { Tile } from '../../core/Tile';
import './style.css';

// track window resize and recalculate canvas ratio

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
/**
 * create grid
 * create map of tiles
 * fill map with background tiles
 * create popup
 * lounch popup on each grid cell click
 * choose tile from list in the popup
 * draw chosen tile to that cell
 * 
 * be able to add, remove, change tiles.
 * when remove - leave OPEN FLOOR tile
 * edit tile - rotate
 *
 * save map
 */
const cellSize = 20;
const cols = Math.ceil(canvas.width / cellSize);
const rows = Math.ceil(canvas.height / cellSize);
const grid = new Grid(rows, cols, canvas.width, canvas.height);

const tileImage = document.getElementById('tiles') as HTMLImageElement;
grid.getAllCells().forEach((cell) => {
    const tile = new Tile(tileImage, [554, 300, 130, 130], cellSize, cellSize, "OPEN FLOOR");

    if (grid.setItem(cell.col, cell.row, tile)) {
        ctx.drawImage(tile.bufferLayer.canvas, cell.x, cell.y);
    } else {
        console.error('Setting tile error.');
    }
});
