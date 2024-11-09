import {Canvas} from "fabric";
import {saveJsonToClipboard} from "../utils/saveJsonToClipboard.ts";

export class CopyActiveElement {

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.copyActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private copyActiveElement(ev: KeyboardEvent) {
        if (ev.key === 'c' && ev.ctrlKey || ev.key === 'c' && ev.metaKey) {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                const element = activeObject.toObject();
                saveJsonToClipboard({
                    object: element,
                    meta: {}
                });
            }
        }
    }

    public destroy(){
        window.removeEventListener("keydown", this.listener);
    }
}