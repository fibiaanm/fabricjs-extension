import {Canvas, FabricObject} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export class PushBackActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.pushBackActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private pushBackActiveElement(ev: KeyboardEvent) {
        if (!(ev.key === 'b')) return;
        this.execute(
            ev.key === 'b' && ev.metaKey || ev.key === 'b' && ev.ctrlKey
        )
    }

    public execute(behindAll: boolean) {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        if (behindAll) {
            this.sendToBack(activeObject);
        } else {
            this.sendBackwards(activeObject);
        }
    }

    private sendToBack(obj: FabricObject) {
        this.canvas.sendObjectToBack(obj);
    }

    private sendBackwards(obj: FabricObject) {
        this.canvas.sendObjectBackwards(obj);
    }

    public destroy(){
        window.removeEventListener("keydown", this.listener);
    }
}
