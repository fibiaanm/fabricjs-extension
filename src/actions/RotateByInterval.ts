import config from "../config/config.ts";
import {Canvas, FabricObject} from "fabric";

export class RotateByInterval {


    constructor(
        canvas: Canvas
    ) {
        canvas.on('object:rotating', (event) => {
            const e = event.e;
            const isShift = e.shiftKey;
            if (isShift) {
                this.checkInterval(event);
            }
        })
    }

    private checkInterval(event: any){
        const target = event.target as FabricObject;
        const currentAngle = target.angle;
        const step = this.interval;
        const remainder = currentAngle % step;
        const halfStep = step / 2;
        if (remainder > halfStep) {
             target.rotate(currentAngle + (step - remainder))
        } else {
            target.rotate(currentAngle - remainder)
        }
    }

    private get interval() {
        return config('objects.rotation.steps')
    }
}