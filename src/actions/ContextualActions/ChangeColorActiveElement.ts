import {Canvas, FabricObject} from "fabric";
import {DialogWithOneInput} from "../OpenDialogs/DialogWithOneInput.ts";
import {normalizeFabricCoords} from "../../utils/normalizeFabricCoords.ts";
import {ExecutableActions} from "../interfaces/ExecutableActions.ts";
import Position from "../../primitives/Position.ts";

export class ChangeColorActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;

    constructor(
        private canvas: Canvas,
    ) {
        this.listener = this.changeColorActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private changeColorActiveElement(ev: KeyboardEvent) {
        if (ev.key === "c" && !ev.ctrlKey && !ev.metaKey) {
            this.execute();
        }
    }

    public execute(coords?: Position) {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject && activeObject.fill) {
            const coordsLocal =
                coords ??
                normalizeFabricCoords(activeObject, this.canvas);
            const dialog = new DialogWithOneInput(
                activeObject.fill.toString(),
                (value) => {
                    this.changeColorCallback(activeObject, value);
                }
            )
            dialog.open({
                coords: coordsLocal,
                title: 'change color',
                inputLabel: 'Color: ',
                inputType: 'color'
            })
        }
    }

    private changeColorCallback(activeObject: FabricObject, value: string) {
        activeObject.fill = value;
        this.canvas.renderAll();
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}