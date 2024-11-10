import {Canvas} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export type DeleteActiveElementConfig = boolean

export class DeleteActiveElement implements ExecutableActions{

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: DeleteActiveElementConfig = true;

    static build(
        canvas: Canvas,
        config: DeleteActiveElementConfig
    ): DeleteActiveElement {
        const instance = new DeleteActiveElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(private canvas: Canvas) {
        this.listener = this.deleteActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
        this.config;
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