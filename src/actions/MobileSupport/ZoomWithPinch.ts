import {Canvas, Point} from "fabric";

export class ZoomWithPinch {
    private initialDistance: number | null = null;
    private initialZoom: number | null = null;
    private initialObjectScale: number | null = null;
    private minZoom = 0.1;
    private maxZoom = 10;

    static build(canvas: Canvas) {
        return new ZoomWithPinch(canvas);
    }

    constructor(private canvas: Canvas) {
        this.initializePinchEvents();
    }

    private touches: HTMLDivElement[] = [];

    private initializePinchEvents() {
        this.canvas.getElement().addEventListener('touchstart', (e) => {

            for (const touch of e.touches) {
                const div = document.createElement('div');
                div.classList.add('fixed', 'bg-green-500', 'w-4', 'h-4', 'rounded-full');
                div.style.left = touch.clientX + 'px';
                div.style.top = touch.clientY + 'px';
                document.body.appendChild(div);
                this.touches.push(div);
            }

            if (e.touches.length === 2) {
                e.preventDefault();
                this.initialDistance = this.getDistance(e.touches[0], e.touches[1]);
                this.initialZoom = this.canvas.getZoom();

                // Store initial scale if there's an active object
                const activeObject = this.canvas.getActiveObject();
                if (activeObject) {
                    this.initialObjectScale = activeObject.scaleX || 1;
                }
            }
        });

        this.canvas.getElement().addEventListener('touchmove', (e) => {

            for (const [i, div] of this.touches.entries()) {
                const touch = e.touches[i];
                div.style.left = touch.clientX + 'px';
                div.style.top = touch.clientY + 'px';
            }

            if (e.touches.length === 2 && this.initialDistance && this.initialZoom) {
                e.preventDefault();
                
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / this.initialDistance;

                const activeObject = this.canvas.getActiveObject();
                if (activeObject && this.initialObjectScale !== null) {
                    // Scale the active object instead of zooming the canvas
                    const newScale = this.initialObjectScale * scale;
                    activeObject.scale(newScale);
                    this.canvas.renderAll();
                } else {
                    // Original canvas zoom behavior
                    let zoom = this.initialZoom * scale;
                    zoom = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);

                    // Calculate center point of the pinch
                    const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                    const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

                    // Convert screen coordinates to canvas coordinates
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
        });

        this.canvas.getElement().addEventListener('touchend', () => {
            this.initialDistance = null;
            this.initialZoom = null;
            this.initialObjectScale = null;
            
            // Remove touch visual aid elements
            for (const div of this.touches) {
                div.remove();
            }
            this.touches = [];
        });
    }

    private getDistance(touch1: Touch, touch2: Touch): number {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}