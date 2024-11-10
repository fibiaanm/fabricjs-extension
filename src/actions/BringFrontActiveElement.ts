import {Canvas, FabricObject} from "fabric";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";

export type BringFrontActiveElementConfig = {}

export class BringFrontActiveElement implements ExecutableActions{

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: BringFrontActiveElementConfig = {}

    static build(canvas: Canvas, config: BringFrontActiveElementConfig): BringFrontActiveElement {
        const instance = new BringFrontActiveElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.bringFrontActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
        this.config;
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