export default class Layer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(w: number, h: number) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d')!;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
