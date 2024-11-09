import {FabricImage, FabricObject, Group, Rect} from "fabric";
import config from "../../config/config.ts";
import {CropBoxConfig} from "../../config/objects.ts";
import Size from "../../primitives/Size.ts";

type TCreateCropBox = {
    outerRect: FabricObject,
    innerRect: FabricObject,
    cutOutGroup: Group,
}

export class CreateCropShapes {

    constructor(
        private activeObject: FabricImage,
    ) {
    }

    public createCropBox(): TCreateCropBox {
        const obj = this.activeObject;
        const clipPathFrame = this.computeClipPathFrame();
        const outerRect = new Rect({
            width: obj.width * obj.scaleX,
            height: obj.height * obj.scaleY,
            left: obj.left,
            top: obj.top,
            fill: 'rgba(0,0,0,0.6)',
            selectable: false,
        });
        const innerRect = new Rect({
            width: clipPathFrame.width,
            height: clipPathFrame.height,
            left: clipPathFrame.x,
            top: clipPathFrame.y,
            fill: 'rgba(0,0,0,1)',
            selectable: false,
        });
        innerRect.globalCompositeOperation = 'destination-out';

        const cutOutGroup = new Group([outerRect, innerRect], {
            left: obj.left,
            top: obj.top,
            selectable: false,
        });

        return {
            outerRect,
            innerRect,
            cutOutGroup,
        };
    }

    private computeClipPathFrame() {
        const obj = this.activeObject;
        const objectRectangle = new DOMRect(
            obj.left,
            obj.top,
            obj.width * obj.scaleX,
            obj.height * obj.scaleY
        );

        if (obj.hasCrop()) {
            const cropX = obj.cropX || 0;
            const cropY = obj.cropY || 0;

            const sourceElement = obj.getElement()
            const originalSize = new Size(
                sourceElement.width,
                sourceElement.height
            );

            obj.set({
                cropX: 0,
                cropY: 0,
                width: originalSize.width,
                height: originalSize.height,
                left: objectRectangle.x - (cropX * obj.scaleX),
                top: objectRectangle.y - (cropY * obj.scaleY),
            });
        }

        return objectRectangle;
    }


    public createControllerBox(cropBox: TCreateCropBox): FabricObject {
        const {innerRect, cutOutGroup} = cropBox;
        const obj = this.activeObject;
        const controller = new Rect({
            left: innerRect.left + cutOutGroup.width / 2 + cutOutGroup.left,
            top: innerRect.top + cutOutGroup.height / 2 + cutOutGroup.top,
            width: innerRect.width * innerRect.scaleX,
            height: innerRect.height * innerRect.scaleY,
            fill: 'rgba(0,0,0,0)',
            selectable: true,
        });

        const objWidth = obj.width * obj.scaleX;
        const objHeight = obj.height * obj.scaleY;
        const objRight = obj.left + objWidth;
        const objBottom = obj.top + objHeight;

        const setOnInnerRect = () => {
            let width, height, left, top, right, bottom, scaleX, scaleY;

            width = controller.width * controller.scaleX;
            height = controller.height * controller.scaleY;
            left = controller.left;
            top = controller.top;
            right = left + width;
            bottom = top + height;
            scaleX = controller.scaleX;
            scaleY = controller.scaleY;

            if (width > objWidth) {
                width = objWidth;
                scaleX = objWidth / controller.width;
            }
            if (height > objHeight) {
                height = objHeight;
                scaleY = objHeight / controller.height;
            }
            if (right > objRight) left = objRight - width;
            if (bottom > objBottom) top = objBottom - height;
            if (left < obj.left) left = obj.left;
            if (top < obj.top) top = obj.top;

            controller.set({ left, top, scaleX, scaleY });
            controller.setCoords();
            innerRect.set({
                width,
                height,
                left: left - cutOutGroup.width / 2 - cutOutGroup.left,
                top: top - cutOutGroup.height / 2 - cutOutGroup.top
            });
        }

        controller.on('moving', setOnInnerRect);
        controller.on('scaling', setOnInnerRect);

        this.configureControlBox(controller);
        return controller;
    }

    private configureControlBox(controller: Rect) {
        const CONTROL_CONFIG = config('objects.cropBox') as CropBoxConfig

        const createControlRender = (type: 'edge' | 'corner', isHorizontal: boolean = false) => {
            return (ctx: CanvasRenderingContext2D, left: number, top: number) => {
                ctx.save();
                ctx.translate(left, top);
                ctx.fillStyle = CONTROL_CONFIG.FILL_STYLE;

                if (type === 'edge') {
                    const { WIDTH, HEIGHT } = isHorizontal ? CONTROL_CONFIG.EDGE.HORIZONTAL : CONTROL_CONFIG.EDGE.VERTICAL;
                    ctx.roundRect(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT, CONTROL_CONFIG.EDGE.CORNER_RADIUS);
                } else {
                    const { SIZE, CORNER_RADIUS } = CONTROL_CONFIG.CORNER;
                    ctx.roundRect(-SIZE/2, -SIZE/2, SIZE, SIZE, CORNER_RADIUS);
                }
                ctx.stroke();
                ctx.fill();
                ctx.restore();
            };
        };

        const configureControls = (controlPositions: readonly string[], type: 'edge' | 'corner') => {
            controlPositions.forEach(position => {
                const control = controller.controls[position];
                const isHorizontal = type === 'edge' && (position === 'mt' || position === 'mb');

                control.render = createControlRender(type, isHorizontal);

                if (type === 'edge') {
                    const { WIDTH, HEIGHT } = isHorizontal ? CONTROL_CONFIG.EDGE.HORIZONTAL : CONTROL_CONFIG.EDGE.VERTICAL;
                    control.sizeX = WIDTH;
                    control.sizeY = HEIGHT;
                } else {
                    control.sizeX = CONTROL_CONFIG.CORNER_SIZE;
                    control.sizeY = CONTROL_CONFIG.CORNER_SIZE;
                }
            });
        };

        configureControls(['mt', 'mb', 'ml', 'mr'] as const, 'edge');
        configureControls(['tl', 'tr', 'bl', 'br'] as const, 'corner');
        controller.setCoords();
    }

}