import {Canvas, FabricObject} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export class BringFrontActiveElement implements ExecutableActions{

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.bringFrontActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private bringFrontActiveElement(ev: KeyboardEvent) {
        if (!(ev.key === 'f')) return;
        this.execute(
            ev.key === 'f' && ev.metaKey || ev.key === 'f' && ev.ctrlKey
        )
        ev.preventDefault();
    }

    public execute(inFrontOfAll: boolean) {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        if (inFrontOfAll) {
            this.bringInFrontOfAll(activeObject);
        } else {
            this.bringForward(activeObject);
        }
    }

    private bringInFrontOfAll(obj: FabricObject) {
        this.canvas.bringObjectToFront(obj);
    }

    private bringForward(obj: FabricObject) {
        this.canvas.bringObjectForward(obj);
    }

    public destroy(){
        window.removeEventListener("keydown", this.listener);
    }
}