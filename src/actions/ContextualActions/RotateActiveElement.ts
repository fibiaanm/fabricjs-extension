import {Canvas, FabricObject} from "fabric";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {DialogWithOneInput} from "../OpenDialogs/DialogWithOneInput.ts";
import {isNumber} from "../../utils/isNumber.ts";
import {ExecutableActions} from "../interfaces/ExecutableActions.ts";
import Position from "../../primitives/Position.ts";

export class RotateActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;

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

    public execute(coords?: Position) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            const localCoords =
                coords ??
                normalizeFabricCoords(activeObject, this.canvas);
            const dialog = new DialogWithOneInput(
                activeObject.angle.toString(),
                (value) => {
                    this.rotationCallback(activeObject, value);
                }
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