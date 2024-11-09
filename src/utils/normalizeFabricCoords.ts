import {Canvas, FabricObject} from "fabric";
import Position from "../primitives/Position.ts";
import Size from "../primitives/Size.ts";

export const normalizeFabricCoords = (activeObject: FabricObject, canvas: Canvas) => {
    const point = new Position(
        activeObject.left,
        activeObject.top
    )
    const vpt = canvas.viewportTransform;
    const zoom = vpt[0];
    const pixelRatio = 1;

    const canvasElement = canvas.upperCanvasEl;
    const canvasBoundingRect = canvasElement.getBoundingClientRect();
    const virtualSize = new Size(
        canvas.width,
        canvas.height
    );

    const decimalPosition = new Position(
        point.x / virtualSize.width * pixelRatio * zoom,
        point.y / virtualSize.height * pixelRatio * zoom
    )
    const relativeCanvasPosition = new Position(
        decimalPosition.x * canvasBoundingRect.width,
        decimalPosition.y * canvasBoundingRect.height
    )
    const decimalOffset = new Position(
        vpt[4] / virtualSize.width * pixelRatio,
        vpt[5] / virtualSize.height * pixelRatio
    )

    const relativeCanvasOffset = new Position(
        decimalOffset.x * canvasBoundingRect.width,
        decimalOffset.y * canvasBoundingRect.height
    )

    return new Position(
        relativeCanvasPosition.x + canvasBoundingRect.left + relativeCanvasOffset.x,
        relativeCanvasPosition.y + canvasBoundingRect.top + relativeCanvasOffset.y
    );
}
