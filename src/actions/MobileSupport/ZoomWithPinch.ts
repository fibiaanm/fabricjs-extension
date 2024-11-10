import {Canvas, Point} from "fabric";
import Position from "../../primitives/Position.ts";

export class ZoomWithPinch {
    private initialDistance: number | null = null;
    private initialZoom: number | null = null;
    private initialObjectScale: number | null = null;
    private lastPanPosition: Position | null = null;
    private minZoom = 0.1;
    private maxZoom = 10;

    static build(
        canvas: Canvas
    ) {
        return new ZoomWithPinch(canvas);
    }

    constructor(private canvas: Canvas) {
        this.initializePinchEvents();
    }

    private initializePinchEvents() {
        this.canvas.on('mouse:move', (opt: any) => {
            if (opt.e.touches) {
                const e = opt.e as any;
                e.preventDefault();

                const activeObject = this.canvas.getActiveObject();
                if (activeObject && opt.e.touches.length === 1){
                    return;
                }
                this.canvas.selection = false;

                if (opt.e.touches.length === 1) {
                    const position = new Position(
                        e.touches[0].clientX,
                        e.touches[0].clientY
                    );
                    this.applyPan(position);
                } else if (opt.e.touches.length === 2) {
                    // apply zoom
                    const touch1 = new Position(
                        e.touches[0].clientX,
                        e.touches[0].clientY
                    );
                    const touch2 = new Position(
                        e.touches[1].clientX,
                        e.touches[1].clientY
                    );
                    this.applyZoom(touch1, touch2);
                }

            }
        });
        this.canvas.on('mouse:up', (opt) => {
            if (opt.e.type === 'touchend') {
                this.lastPanPosition = null;
                this.initialDistance = null;
                this.initialZoom = null;
                this.initialObjectScale = null;
            }
            this.canvas.selection = true;
        });
    }

    private applyPan(position: Position) {
        if (this.lastPanPosition) {
            const deltaX = position.x - this.lastPanPosition.x;
            const deltaY = position.y - this.lastPanPosition.y;
            const vpt = this.canvas.viewportTransform;
            vpt[4] += deltaX;
            vpt[5] += deltaY;
            this.canvas.renderAll();
        }
        this.lastPanPosition = position
    }

    private getTouchDistance(touch1: Position, touch2: Position) {
        return Math.sqrt(
            Math.pow(touch1.x - touch2.x, 2) + Math.pow(touch1.y - touch2.y, 2)
        );
    }

    private applyZoom(touch1: Position, touch2: Position) {
        if (this.initialDistance && this.initialZoom) {
            const activeObject = this.canvas.getActiveObject();
            const currentDistance = this.getTouchDistance(touch1, touch2);
            const scale = currentDistance / this.initialDistance;

            if (activeObject && this.initialObjectScale) {
                // const newScale = this.initialObjectScale * scale;
                // const center = activeObject.getCenterPoint();
                // activeObject.scale(newScale);
                // activeObject.setPositionByOrigin(center, 'center', 'center');
                // this.canvas.renderAll();
            } else {
                let zoom = this.initialZoom * scale;
                zoom = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);

                const centerX = (touch1.x + touch2.x) / 2;
                const centerY = (touch1.y + touch2.y) / 2;

                const rect = this.canvas.getElement().getBoundingClientRect();
                const xRatio = this.canvas.width / rect.width;
                const yRatio = this.canvas.height / rect.height;

                const zoomPoint = new Point(
                    (centerX - rect.left) * xRatio,
                    (centerY - rect.top) * yRatio
                );

                this.canvas.zoomToPoint(zoomPoint, zoom);
                this.canvas.renderAll();
            }


        }

        this.initialDistance = this.getTouchDistance(touch1, touch2);
        this.initialZoom = this.canvas.getZoom();

        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            this.initialObjectScale = activeObject.scaleX || 1;
        }
    }
}