import { TileNames } from '../types/Names';
import Layer from './layer';

export class Tile {
    bufferLayer: Layer;

    constructor(img: HTMLImageElement, dimmentions: [number, number, number, number], w: number, h:number, public name: TileNames) {
        const [sx, sy, sw, sh] = dimmentions;
        this.bufferLayer = new Layer(w, h);

        this.bufferLayer.ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    }
}
