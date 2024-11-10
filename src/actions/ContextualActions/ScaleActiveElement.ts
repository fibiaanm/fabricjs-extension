import {Canvas, FabricObject} from "fabric";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {DialogWithTwoInputs} from "../OpenDialogs/DialogWithTwoInputs.ts";
import {ExecutableActions, TwoInputAction, TwoInputUpdateCallback} from "../interfaces/ExecutableActions.ts";
import Position from "../../primitives/Position.ts";

export type ScaleActiveElementConfig = {} & TwoInputAction

export class ScaleActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: ScaleActiveElementConfig = {}

    static build(canvas: Canvas, config: ScaleActiveElementConfig): ScaleActiveElement {
        const instance = new ScaleActiveElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.scaleActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private scaleActiveElement(ev: KeyboardEvent) {
        if (ev.key === "s") {
            this.execute();
        }
    }

    public execute({coords}: {coords?: Position} = {}) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            const localCoords =
                coords ??
                normalizeFabricCoords(activeObject, this.canvas);
            const callbackFunction: TwoInputUpdateCallback = (value) => {
                this.scaleCallback(activeObject, value);
            }
            const updateCallback = callbackFunction.bind(this);

            if (this.config?.open) {
                this.config.open(
                    localCoords,
                    updateCallback
                );
                return;
            }

            const dialog = new DialogWithTwoInputs(
                [activeObject.scaleX.toString(), activeObject.scaleY.toString()],
                updateCallback
            );
            dialog.open({
                coords: localCoords,
                title: 'scale',
                inputLabels: ['X: ', 'Y: ']
            });
        }
    }

    private scaleCallback(activeObject: FabricObject, value: string[]) {
        activeObject.scaleX = parseFloat(value[0]);
        activeObject.scaleY = parseFloat(value[1]);
        activeObject.setCoords();
        this.canvas.renderAll();
    }
}