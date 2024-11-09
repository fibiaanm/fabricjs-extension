import {Canvas} from "fabric";

export class DeleteActiveElement {

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(private canvas: Canvas) {
        this.listener = this.deleteActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private deleteActiveElement(ev: KeyboardEvent) {
        if (ev.key === "Delete" || ev.key === "Backspace") {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                this.canvas.remove(activeObject);
            }
        }
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}