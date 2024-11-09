import {Canvas, FabricObject} from "fabric";
import {UserDependentActions} from "./interfaces/userDependentActions.ts";


export class CropActiveElement implements UserDependentActions{

    private activeObject: FabricObject | undefined;

    constructor(
        private canvas: Canvas
    ) {
        canvas.on('selection:cleared', () => {
        });
        canvas.on('selection:updated', () => {
        });
        canvas.on('selection:created', () => {
        });
    }

    apply(): void {
        this.activeObject;
    }

    cancel(): void {
    }

    clear(): void {
    }

    start(): void {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) {
            throw new Error('There is no active object');
        }
        this.activeObject = activeObject;
    }
}