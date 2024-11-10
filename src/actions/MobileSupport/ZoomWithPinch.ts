import {Canvas, Point} from "fabric";
import Position from "../../primitives/Position.ts";

export class ZoomWithPinch {
    private initialDistance: number | null = null;
    private initialZoom: number | null = null;
    private initialObjectScale: number | null = null;
    private lastPanPosition: Position | null = null;
    private readonly minZoom = 0.1;
    private readonly maxZoom = 10;

    static build(canvas: Canvas) {
        return new ZoomWithPinch(canvas);
    }

    constructor(private canvas: Canvas) {
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        this.canvas.on('mouse:move', this.handleMouseMove.bind(this));
        this.canvas.on('mouse:up', this.handleMouseUp.bind(this));
        // const gesture = document.getElementById('gesture')!;
        // this.canvas.on('mouse:dblclick', (opt) => {
        //     console.log('dblclick', opt);
        //     gesture.innerHTML = opt.e.type;
        // });
        // this.canvas.on('mouse:down', (opt) => {
        //     console.log('down', opt);
        //     // activate double touch and move for select area
        //     gesture.innerHTML = opt.e.type;
        // });
    }

    private handleMouseMove(opt: any) {
        if (!opt.e.touches) return;
        
        const e = opt.e as TouchEvent;
        e.preventDefault();

        const touchCount = e.touches.length;
        const activeObject = this.canvas.getActiveObject();

        // Skip if there's an active object with single touch
        if (activeObject && touchCount === 1) return;

        this.canvas.selection = false;

        if (touchCount === 1) {
            this.handleSingleTouch(e.touches[0]);
        } else if (touchCount === 2) {
            this.handleDoubleTouch(e.touches[0], e.touches[1]);
        }
    }

    private handleMouseUp(opt: any) {
        if (opt.e.type === 'touchend') {
            this.resetState();
        }
        this.canvas.selection = true;
    }

    private handleSingleTouch(touch: Touch) {
        const position = new Position(touch.clientX, touch.clientY);
        this.applyPan(position);
    }

    private handleDoubleTouch(touch1: Touch, touch2: Touch) {
        const position1 = new Position(touch1.clientX, touch1.clientY);
        const position2 = new Position(touch2.clientX, touch2.clientY);
        this.applyZoom(position1, position2);
    }

    private applyPan(position: Position) {
        if (this.lastPanPosition) {
            const delta = {
                x: position.x - this.lastPanPosition.x,
                y: position.y - this.lastPanPosition.y
            };
            
            const vpt = this.canvas.viewportTransform;
            if (!vpt) return;

            vpt[4] += delta.x;
            vpt[5] += delta.y;
            this.canvas.renderAll();
        }
        this.lastPanPosition = position;
    }

    private applyZoom(touch1: Position, touch2: Position) {
        const currentDistance = this.getTouchDistance(touch1, touch2);
        
        if (this.initialDistance && this.initialZoom) {
            const scale = currentDistance / this.initialDistance;
            const activeObject = this.canvas.getActiveObject();

            if (activeObject && this.initialObjectScale) {
                this.handleObjectZoom();
            } else {
                this.handleCanvasZoom(touch1, touch2, scale);
            }
        }

        // Update initial values for next move event
        this.updateInitialValues(currentDistance);
    }

    private handleObjectZoom() {
        // Object zoom logic commented out for now
        // Uncomment and modify when implementing object scaling
        /*
        const newScale = this.initialObjectScale * scale;
        const center = activeObject.getCenterPoint();
        activeObject.scale(newScale);
        activeObject.setPositionByOrigin(center, 'center', 'center');
        this.canvas.renderAll();
        */
    }

    private handleCanvasZoom(touch1: Position, touch2: Position, scale: number) {
        let zoom = this.initialZoom! * scale;
        zoom = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);

        const zoomPoint = this.calculateZoomPoint(touch1, touch2);
        this.canvas.zoomToPoint(zoomPoint, zoom);
        this.canvas.renderAll();
    }

    private calculateZoomPoint(touch1: Position, touch2: Position): Point {
        const centerX = (touch1.x + touch2.x) / 2;
        const centerY = (touch1.y + touch2.y) / 2;

        const rect = this.canvas.getElement().getBoundingClientRect();
        const xRatio = this.canvas.width / rect.width;
        const yRatio = this.canvas.height / rect.height;

        return new Point(
            (centerX - rect.left) * xRatio,
            (centerY - rect.top) * yRatio
        );
    }

    private getTouchDistance(touch1: Position, touch2: Position): number {
        return Math.sqrt(
            Math.pow(touch1.x - touch2.x, 2) + 
            Math.pow(touch1.y - touch2.y, 2)
        );
    }

    private updateInitialValues(currentDistance: number) {
        this.initialDistance = currentDistance;
        this.initialZoom = this.canvas.getZoom();

        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            this.initialObjectScale = activeObject.scaleX || 1;
        }
    }

    private resetState() {
        this.lastPanPosition = null;
        this.initialDistance = null;
        this.initialZoom = null;
        this.initialObjectScale = null;
    }
}