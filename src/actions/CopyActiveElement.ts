import {Canvas} from "fabric";
import {saveJsonToClipboard} from "../utils/saveJsonToClipboard.ts";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export class CopyActiveElement implements ExecutableActions{

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.copyActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private copyActiveElement(ev: KeyboardEvent) {
        if (ev.key === 'c' && ev.ctrlKey || ev.key === 'c' && ev.metaKey) {
            this.execute();
        }
    }

    public execute() {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            const element = activeObject.toObject();
            saveJsonToClipboard({
                object: element,
                meta: {}
            });
        }
    }

    public destroy(){
        window.removeEventListener("keydown", this.listener);
    }
}