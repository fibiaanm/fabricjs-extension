import {Canvas} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";
import {extensionCustomWindowEvents} from "./list.ts";

export type DeleteActiveElementConfig = {
    justEmitEvent?: boolean
}

export class DeleteActiveElement implements ExecutableActions{

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: DeleteActiveElementConfig = {};

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
    }

    private deleteActiveElement(ev: KeyboardEvent) {
        if (ev.key === "Delete" || ev.key === "Backspace") {
            this.execute();
        }
    }

    public execute() {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        if (this.config.justEmitEvent) {
            const deleteEvent = new CustomEvent(extensionCustomWindowEvents.deleteActiveElement, {
                detail: {
                    object: activeObject
                }
            });
            window.dispatchEvent(deleteEvent);
            return;
        }
        this.canvas.remove(activeObject);
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}