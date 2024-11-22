import { Canvas, FabricObject } from "fabric";
import { VirtualizeSize } from "../../utils/virtualizeSize";

export type HandlerControllersCustomizationConfig = {
    transparentCorners?: boolean;
    cornerColor?: string;
    borderColor?: string;
    borderScaleFactor?: number;
    cornerStyle?: 'circle' | 'rect';
    cornerSize?: number;
    rotatingPointOffset?: number;
    cursorRotationSVG?: string;
}

export class HandlerControllersCustomization {
    public config: HandlerControllersCustomizationConfig = {};

    static build(canvas: Canvas, config: HandlerControllersCustomizationConfig) {
        const instance = new HandlerControllersCustomization(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.setupObjectAddedListener();
    }

    private setupObjectAddedListener() {
        this.canvas.on('object:added', (event) => {
            const shape = event.target as FabricObject;
            if (!shape) return;
            
            if (this.config.transparentCorners !== undefined) {
                shape.transparentCorners = this.config.transparentCorners;
            }
            if (this.config.cornerColor !== undefined) {
                shape.cornerColor = this.config.cornerColor;
            }
            if (this.config.borderColor !== undefined) {
                shape.borderColor = this.config.borderColor;
            }
            if (this.config.borderScaleFactor !== undefined) {
                shape.borderScaleFactor = this.config.borderScaleFactor;
            }
            if (this.config.cornerStyle !== undefined) {
                shape.cornerStyle = this.config.cornerStyle;
            }
            if (this.config.cornerSize !== undefined) {
                shape.cornerSize = this.config.cornerSize;
            }
            if (this.config.rotatingPointOffset !== undefined) {            
                shape.controls.mtr.offsetY = VirtualizeSize(this.config.rotatingPointOffset, this.canvas);
            }
            if (this.config.cursorRotationSVG !== undefined) {
                shape.controls.mtr.cursorStyle = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.config.cursorRotationSVG)}") 12 12, crosshair`;
            }
        });
    }
}