import {Canvas, Control, FabricObject, util } from "fabric";

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
            const angleText = `${this.currentAngle.toFixed(0)}°`,
            borderRadius = 5,
            rectWidth = 32,
            rectHeight = 19,
            textWidth = 6.01 * angleText.length - 2.317;

            const { tl, br } = canvas.calcViewportBoundaries();

            const translateX = Math.min(Math.max(left, tl.x), br.x - rectWidth);
            const translateY = Math.min(Math.max(top, tl.y), br.y - rectHeight);
            

            ctx.save();
            ctx.translate(translateX, translateY);
            ctx.rotate(util.degreesToRadians(fabricObject.angle));
            ctx.fillStyle = "rgba(37,38,39,0.9)";
            ctx.roundRect(0, 0, rectWidth, rectHeight, borderRadius);
            ctx.fill();
            ctx.font = "400 13px serif";
            ctx.fillStyle = "hsla(0,0%, 100%, 0.9)";
            ctx.fillText(angleText, rectWidth / 2 - textWidth / 2, rectHeight / 2 + 4);
            ctx.restore();
        }
    }
}