import {Canvas} from "fabric";
import Size from "../../primitives/Size.ts";
import {ExecutableActions} from "../interfaces/ExecutableActions.ts";

export type PanToCenterConfig = {}

export class PanToCenter implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: PanToCenterConfig = {}

    static build(canvas: Canvas, config: PanToCenterConfig): PanToCenter {
        const instance = new PanToCenter(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas,
    ) {
        this.listener = this.panToCenter.bind(this);
        window.addEventListener("keydown", this.listener);
        this.config;
    }

    private panToCenter(event: KeyboardEvent) {
        if (event.key === "o" && !event.ctrlKey && !event.metaKey) {
            this.execute();
        }
    }

    public execute() {
        const vpt = this.canvas.viewportTransform;
        const virtualSize = new Size(
            this.canvas.width,
            this.canvas.height
        );

        vpt[4] = virtualSize.width / 2;
        vpt[5] = virtualSize.height / 2;

        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            activeObject.setCoords();
        }
        this.canvas.requestRenderAll();
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}