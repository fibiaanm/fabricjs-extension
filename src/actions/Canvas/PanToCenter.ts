import {Canvas} from "fabric";
import Size from "../../primitives/Size.ts";

export class PanToCenter {

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(
        private canvas: Canvas,
    ) {
        this.listener = this.panToCenter.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    public panToCenter(event: KeyboardEvent) {
        if (event.key === "o" && !event.ctrlKey && !event.metaKey) {
            const vpt = this.canvas.viewportTransform;
            const virtualSize = new Size(
                this.canvas.width,
                this.canvas.height
            );

            vpt[4] = virtualSize.width / 2;
            vpt[5] = virtualSize.height / 2;

            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                activeObject.setCoords();
            }
            this.canvas.requestRenderAll();
        }
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}