import {Canvas, FabricObject} from "fabric";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {DialogWithOneInput} from "../OpenDialogs/DialogWithOneInput.ts";
import {isNumber} from "../../utils/isNumber.ts";
import {ExecutableActions, OneInputAction, oneInputUpdateCallback} from "../interfaces/ExecutableActions.ts";
import Position from "../../primitives/Position.ts";

export type RotateActiveElementConfig = {
} & OneInputAction

export class RotateActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: RotateActiveElementConfig = {}
    public contextual = {
        name: 'Rotate',
        order: '2,1',
    }

    static build(canvas: Canvas, config: RotateActiveElementConfig): RotateActiveElement {
        const instance = new RotateActiveElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.rotateActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private rotateActiveElement(ev: KeyboardEvent) {
        if (ev.key === "r" && !ev.ctrlKey && !ev.metaKey) {
            this.execute();
        }
    }

    public execute({coords}: {coords?: Position} = {}) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            const localCoords =
                coords ??
                normalizeFabricCoords(activeObject, this.canvas);
            const updateFunction: oneInputUpdateCallback = (value: string) => {
                this.rotationCallback(activeObject, value);
            }
            const updateCallback = updateFunction.bind(this)

            if (this.config?.open) {
                this.config.open(
                    localCoords,
                    updateCallback
                )
                return;
            }

            const dialog = new DialogWithOneInput(
                activeObject.angle.toString(),
                updateCallback
            )
            dialog.open({coords: localCoords, title: 'rotate'})
        }
    }

    private rotationCallback(activeObject: FabricObject, value: string) {
        if (!isNumber(value)) return;
        activeObject.rotate(parseFloat(value));
        activeObject.setCoords();
        this.canvas.renderAll();
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }

}