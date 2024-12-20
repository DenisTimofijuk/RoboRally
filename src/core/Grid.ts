import { Entity } from "../types/Entity.type";
import { GridCell } from "../types/Grid.type";

export class Grid {
    private grid: GridCell[][] = [];
    private readonly cellWidth: number;
    private readonly cellHeight: number;
    private readonly columns: number;
    private readonly rows: number;

    constructor(rows: number, columns: number, width: number, height: number) {
        if (columns <= 0 || rows <= 0) {
            this.error('Dimensions must be positive numbers.');
        }

        this.columns = columns;
        this.rows = rows;
        this.cellWidth = Math.floor(width / columns);
        this.cellHeight = Math.floor(height / rows);

        this.initializeGrid();
    }

    private initializeGrid(): void {
        this.grid = Array(this.columns)
            .fill(null)
            .map((_, col) =>
                Array(this.rows)
                    .fill(null)
                    .map((_, row) => ({
                        h: this.cellHeight,
                        w: this.cellWidth,
                        x: col * this.cellWidth,
                        y: row * this.cellHeight,
                        col: col,
                        row: row,
                        item: null,
                    }))
            );
    }


    private isValidPosition(col: number, row: number): boolean {
        return col >= 0 && col < this.columns && row >= 0 && row < this.rows;
    }

    public setItem(col: number, row: number, item: Entity): boolean {
        if (!this.isValidPosition(col, row)) {
            this.error('Entitie set error - invalid possition.', col, row);
            return false;
        }

        if (this.grid[col][row].item !== null) {
            this.error('Entitie set error - Cell is occupied.');
            return false;
        }

        this.grid[col][row].item = item;
        return true;
    }

    public getItem(col: number, row: number): Entity | null {
        if (!this.isValidPosition(col, row)) return null;
        return this.grid[col][row].item;
    }

    public removeItem(col: number, row: number): Entity | null {
        if (!this.isValidPosition(col, row)) {
            this.error('remove item error - Invalid possition.');
            return null;
        }

        const item = this.grid[col][row].item;
        this.grid[col][row].item = null;
        return item;
    }

    public removeAllItems() {
        this.grid.forEach((row) => row.forEach((cell) => this.removeItem(cell.col, cell.row)));
    }

    public getCellByCoordinates(pixelX: number, pixelY: number): GridCell | null {
        const col = Math.floor(pixelX / this.cellWidth);
        const row = Math.floor(pixelY / this.cellHeight);

        if (!this.isValidPosition(col, row)) return null;
        return this.grid[col][row];
    }

    public getAllCells(): GridCell[] {
        return this.grid.flat();
    }

    public getGridDimensions(): { columns: number; rows: number; cellWidth: number; cellHeight: number } {
        return {
            columns: this.columns,
            rows: this.rows,
            cellWidth: this.cellWidth,
            cellHeight: this.cellHeight,
        };
    }

    private error(...args: any[]) {
        throw new Error('Grid error: ' + args.join(' '));
    }
}