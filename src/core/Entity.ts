import Layer from './layer';

export class Entity {
    bufferLayer: Layer;
    idleFrames: Layer[];
    activeFrames: Layer[];
    traits: Map<string, any>;
    constructor(private w: number, private h: number, public name: string) {
        this.bufferLayer = new Layer(w, h);
        this.activeFrames = [];
        this.idleFrames = [];
        this.traits = new Map();

        // const img = new Image(w, h);
        // img.onload = () => {
        //     this.bufferLayer.ctx.drawImage(img, 0, 0, w, h);
        // };

        // img.onerror = () => {
        //     console.error('Failed to load image.', name, url);
        // };

        // img.src = url;
    }

    private createFrames(img: HTMLImageElement, frames: [number, number, number, number][], targetFrameArray: Layer[]) {
        if (frames.length === 0) return;

        frames.forEach((frameData) => {
            const [sx, sy, sWidth, sHeight] = frameData;
            const frameLayer = new Layer(this.w, this.h);

            frameLayer.ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, this.w, this.h);

            targetFrameArray.push(frameLayer);
        });
    }

    createIdleFrames(img: HTMLImageElement, frames: [number, number, number, number][]) {
        this.createFrames(img, frames, this.idleFrames);
    }

    createActiveFrames(img: HTMLImageElement, frames: [number, number, number, number][]) {
        this.createFrames(img, frames, this.activeFrames);
    }

    addTrait(trait: any) {
        this.traits.set(trait. name, trait);
    }

    update(){
        this.traits.forEach(trait => trait.update());
    }

    /**
     * draw frames to buffer
     * initiate traits
     * traits:
     *  - collide
     *  - OTHER ABILITIES COLLECTED FROM CARDS
     */
}


//tile start: 35x40
//tile size: 165x170