import { Entity } from "./Entity.type";

export interface GridCell {
    col: number;
    row: number;
    x: number;
    y: number;
    w: number;
    h: number;
    item: Entity | null;
}