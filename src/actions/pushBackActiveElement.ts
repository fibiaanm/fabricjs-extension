import {Canvas, FabricObject} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export type PushBackActiveElementConfig = {}

export class PushBackActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: PushBackActiveElementConfig = {}

    static build(canvas: Canvas, config: PushBackActiveElementConfig): PushBackActiveElement {
        const instance = new PushBackActiveElement(canvas);
        instance.config = config;
        return instance;
    }
    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.pushBackActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
        this.config;
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
