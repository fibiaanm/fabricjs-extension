import {Canvas, FabricObject} from "fabric";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {DialogWithTwoInputs} from "../OpenDialogs/DialogWithTwoInputs.ts";

export class MoveActiveElement {

    private readonly listener: (ev: KeyboardEvent) => void;

    constructor(
        private canvas: Canvas,
    ) {
        this.listener = this.moveActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private moveActiveElement(ev: KeyboardEvent) {
        if (ev.key === "m" && !ev.ctrlKey && !ev.metaKey) {
            const activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                const coords = normalizeFabricCoords(activeObject, this.canvas);
                const dialog = new DialogWithTwoInputs(
                    [activeObject.left.toString(), activeObject.top.toString()],
                    (values) => {
                        this.moveCallback(activeObject, values);
                    }
                )
                dialog.open({
                    coords,
                    title: 'move',
                    inputLabels: ['Left: ', 'Top: ']
                })
            }
        }
    }

    private moveCallback(activeObject: FabricObject, values: string[]) {
        const [left, top] = values;
        activeObject.left = parseFloat(left);
        activeObject.top = parseFloat(top);
        activeObject.setCoords();
        this.canvas.renderAll();
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}