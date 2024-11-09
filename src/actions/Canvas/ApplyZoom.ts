import {Canvas, Point, TPointerEventInfo} from "fabric";

export type ApplyZoomConfig = boolean;

export class ApplyZoom {
    private readonly listener: (opt: TPointerEventInfo<WheelEvent>) => void;
    private minZoom = 0.1;
    private maxZoom = 10;

    private config: ApplyZoomConfig = true;

    static build(canvas: Canvas, config: ApplyZoomConfig): ApplyZoom {
        const instance = new ApplyZoom(canvas);
        instance.config = config;
        return instance;
    }

    constructor(private canvas: Canvas) {
        this.listener = this.handleMouseWheel.bind(this);
        this.canvas.on('mouse:wheel', this.listener);
        this.config;
    }

    private handleMouseWheel(opt: TPointerEventInfo<WheelEvent>) {
        const event = opt.e as WheelEvent;
        if (!event.shiftKey && !event.ctrlKey && !event.metaKey)
            return;

        event.preventDefault();

        const delta = event.deltaY;
        let zoom = this.canvas.getZoom();
        zoom *= 0.98 ** delta;
        if (zoom > this.maxZoom) zoom = this.maxZoom;
        if (zoom < this.minZoom) zoom = this.minZoom;

        const xRatio = this.canvas.width / this.canvas.upperCanvasEl.clientWidth;
        const yRatio = this.canvas.height / this.canvas.upperCanvasEl.clientHeight;

        const zoomPoint = new Point(
            opt.e.offsetX * xRatio,
            opt.e.offsetY * yRatio
        );

        this.canvas.
            zoomToPoint(zoomPoint, zoom);

        opt.e.preventDefault();
        opt.e.stopPropagation();

    }

}
