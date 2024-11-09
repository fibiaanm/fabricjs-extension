import {Canvas, FabricObject} from "fabric";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {DialogWithOneInput} from "../OpenDialogs/DialogWithOneInput.ts";
import {isNumber} from "../../utils/isNumber.ts";

export class RotateActiveElement {

    private readonly listener: (ev: KeyboardEvent) => void;

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.rotateActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private rotateActiveElement(ev: KeyboardEvent) {
        if (ev.key === "r" && !ev.ctrlKey && !ev.metaKey) {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                const coords = normalizeFabricCoords(activeObject, this.canvas);
                const dialog = new DialogWithOneInput(
                    activeObject.angle.toString(),
                    (value) => {
                        this.rotationCallback(activeObject, value);
                    }
                )
                dialog.open({coords, title: 'rotate'})
            }
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