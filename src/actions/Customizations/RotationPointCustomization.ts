import {Canvas, Control, controlsUtils, FabricObject, util} from "fabric";
import rotationSvg from "../../resources/rotationSvg.ts";
import {VirtualizeSize} from "../../utils/virtualizeSize.ts";
import config from "../../config/config.ts";
import { animationRotateToAngle } from "../../utils/animationRotateToAngle.ts";

export type RotationPointCustomizationConfig = {
    svg?: () => string;
    resetRotationShorcut?: {
        key?: string;
        enabled: boolean;
    };
}

export class RotationPointCustomization {

    private static rotatingIcon: HTMLImageElement;
    private static svgSource: string = rotationSvg;
    public config: RotationPointCustomizationConfig = {
        resetRotationShorcut: {
            key: '0',
            enabled: true
        }
    };

    static get svgResource() {
        if (!RotationPointCustomization.rotatingIcon) {
            const img = window.document.createElement('img');
            const svgRotateIcon = encodeURIComponent(
                RotationPointCustomization.svgSource
            );
            img.crossOrigin = 'anonymous';
            img.src = `data:image/svg+xml;utf8,${svgRotateIcon}`
            RotationPointCustomization.rotatingIcon = img;
            window.document.documentElement.append(img);
        }
        return RotationPointCustomization.rotatingIcon;
    }

    static build(canvas: Canvas, config: RotationPointCustomizationConfig) {
        config.svg && (RotationPointCustomization.svgSource = config.svg());
        const instance = new RotationPointCustomization(canvas);
        instance.config = {...instance.config, ...config};
        return instance;
    }

    private eventListener: null | ((e: KeyboardEvent) => void) = null;

    constructor(
        private canvas: Canvas
    ) {
        this.config.svg && (RotationPointCustomization.svgSource = this.config.svg());
        RotationPointCustomization.svgResource.onload = () => {}
        canvas.on('object:added', (a    ) => {
            const object = a.target;
            object.controls.mtr = this.createRotationControl();
        })
    }

    private createRotationControl(): Control {
        const renderFunction = (
            ctx: CanvasRenderingContext2D,
            left: number,
            top: number,
            styleOverride: any,
            fabricObject: FabricObject
        ) => {
            styleOverride;
            const size = VirtualizeSize(36, this.canvas);
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(RotationPointCustomization.svgResource, -size / 2, -size / 2, size, size);
            ctx.restore();
        }
        const offsetY = VirtualizeSize(
            config('objects.rotationPoint.offsetY'),
            this.canvas
        )
        return new Control({
            x: 0,
            y: -0.5,
            offsetX: 0,
            offsetY: offsetY * 2,
            cursorStyle: 'crosshair',
            actionHandler: controlsUtils.rotationWithSnapping,
            actionName: 'rotate',
            render: renderFunction,
            withConnection: true,
            sizeX: 36,
            sizeY: 36,
            mouseDownHandler: () => {
                this.eventListener = this.ReturnZeroRotate.bind(this);
                window.addEventListener('keydown', this.eventListener);
            },
            mouseUpHandler: () => {
                this.destroy();
            }
        });
    }

    private ReturnZeroRotate = (e: KeyboardEvent) => {
        if (!this.config.resetRotationShorcut?.enabled) return;
        if (e.key !== this.config.resetRotationShorcut?.key) return;
        
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;
        
        const currentAngle = activeObject.angle;
        if (currentAngle === 0) return;
        animationRotateToAngle({
            activeObject,
            targetAngle: 0,
            duration: 100,
            canvas: this.canvas,
            showLabel: true,
        })

        this.canvas.fire('object:rotating', {
            target: activeObject,
            e: new MouseEvent('mousemove')
        } as any);
    }

    destroy() {
        if (this.eventListener) {
            window.removeEventListener('keydown', this.eventListener);
            this.eventListener = null;
        }
    }
}