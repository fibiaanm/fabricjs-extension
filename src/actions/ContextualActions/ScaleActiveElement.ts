import {Canvas, FabricObject} from "fabric";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {DialogWithTwoInputs} from "../OpenDialogs/DialogWithTwoInputs.ts";

export class ScaleActiveElement {

    private readonly listener: (ev: KeyboardEvent) => void;

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.scaleActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private scaleActiveElement(ev: KeyboardEvent) {
        if (ev.key === "s") {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                const coords = normalizeFabricCoords(activeObject, this.canvas);
                const dialog = new DialogWithTwoInputs(
                    [activeObject.scaleX.toString(), activeObject.scaleY.toString()],
                    (value) => {
                        this.scaleCallback(activeObject, value);
                    }
                )
                dialog.open({
                    coords,
                    title: 'scale',
                    inputLabels: ['X: ', 'Y: ']
                });
            }
        }
    }

    private scaleCallback(activeObject: FabricObject, value: string[]) {
        activeObject.scaleX = parseFloat(value[0]);
        activeObject.scaleY = parseFloat(value[1]);
        activeObject.setCoords();
        this.canvas.renderAll();
    }
}