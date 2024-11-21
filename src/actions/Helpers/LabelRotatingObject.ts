import {Canvas, Control, FabricObject, util } from "fabric";
import { VirtualizeSize } from "../../utils/virtualizeSize";

export class LabelRotatingObject {


    public isRotating: boolean;
    public currentAngle: number;

    static build(
        canvas: Canvas,
    ): LabelRotatingObject {
        return new LabelRotatingObject(canvas);
    }

    constructor(
        canvas: Canvas
    ) {
        this.isRotating = false;
        this.currentAngle = 0;

        canvas.on('object:rotating', (event) => {
            this.isRotating = true;
            this.currentAngle = event.target.angle;
        })

        canvas.on('mouse:up', () => {
            this.isRotating = false;
        })

        
        canvas.on('object:added', (event) => {
            const target = event.target as FabricObject;
            target.controls.helper = new Control({
                x: 0,
                y: -0.5,
                offsetY: -30,
                offsetX: 30,
                render: (ctx: CanvasRenderingContext2D, left: number, top: number, fabricObject: FabricObject) => {
                    this.renderControl(ctx, left, top, canvas, fabricObject);
                },
            })
        })
        
    }
    private renderControl(
        ctx: CanvasRenderingContext2D,
        left: number,
        top: number,
        canvas: Canvas,
        fabricObject: FabricObject
    ): void {
        if (this.isRotating) {
            const angleText = `${this.currentAngle.toFixed(0)}°`;
        
            const size = VirtualizeSize(18, canvas);
            const rectWidth = VirtualizeSize(36, canvas);
            const rectHeight = VirtualizeSize(24, canvas);
            const fontSize = VirtualizeSize(12, canvas);

            ctx.font = `400 ${fontSize}px serif`;
            const textWidth = ctx.measureText(angleText).width;

            const borderRadius = size / 3;

            const { tl, br } = canvas.calcViewportBoundaries();

            const translateX = left + rectWidth / 4;
            const translateY = top - rectHeight;
            const clampedX = Math.min(Math.max(translateX, tl.x), br.x - rectWidth);
            const clampedY = Math.min(Math.max(translateY, tl.y), br.y - rectHeight);

            ctx.save();
            ctx.translate(clampedX, clampedY);
            ctx.beginPath();
            ctx.rotate(util.degreesToRadians(fabricObject.angle));
            ctx.fillStyle = "rgba(37,38,39,0.9)";
            ctx.roundRect(0, 0, rectWidth, rectHeight, borderRadius);
            ctx.fill();
            ctx.fillStyle = "hsla(0,0%, 100%, 0.9)";
            ctx.fillText(angleText, (rectWidth - textWidth) / 2, rectHeight / 2 + fontSize / 4);
            ctx.restore();
        }
    }
}