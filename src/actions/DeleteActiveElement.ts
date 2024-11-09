import {Canvas} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export class DeleteActiveElement implements ExecutableActions{

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(private canvas: Canvas) {
        this.listener = this.deleteActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private deleteActiveElement(ev: KeyboardEvent) {
        if (ev.key === "Delete" || ev.key === "Backspace") {
            this.execute();
        }
    }

    public execute() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;
        this.canvas.remove(activeObject);
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}