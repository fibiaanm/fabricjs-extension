import { Canvas, FabricObject } from "fabric";

export type HandlerControllersCustomizationConfig = {
    transparentCorners?: boolean;
    cornerColor?: string;
    borderColor?: string;
    borderScaleFactor?: number;
    cornerStyle?: 'circle' | 'rect';
    cornerSize?: number;
    rotatingPointOffset?: number;
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
            console.log('shape', shape, this.config);
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
                shape.controls.mtr.offsetY = this.config.rotatingPointOffset;
            }
        });
    }
}