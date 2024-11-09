import {Canvas, TPointerEventInfo} from "fabric";

export class ApplyPan {

    constructor(
        private canvas: Canvas
    ) {
        canvas.on('mouse:wheel', (opt: TPointerEventInfo<WheelEvent>) => {
            const ev = opt.e;
            this.onMouseWheel(ev);
        });
    }

    public onMouseWheel(event: WheelEvent) {
        if (event.shiftKey || event.ctrlKey || event.metaKey)
            return;

        event.preventDefault();

        const deltaY = event.deltaY;
        const deltaX = event.deltaX;

        const vpt = this.canvas.viewportTransform;
        vpt[4] -= deltaX;
        vpt[5] -= deltaY;

        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            activeObject.setCoords();
        }

        this.canvas.requestRenderAll();
    }

}