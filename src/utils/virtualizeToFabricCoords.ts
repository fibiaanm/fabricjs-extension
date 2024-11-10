import Position from "../primitives/Position.ts";
import {Canvas} from "fabric";

export const virtualizeToFabricCoords = (coords: Position, canvas: Canvas) => {
    const vpt = canvas.viewportTransform;
    const zoom = vpt[0];
    const pixelRatio = 1;

    const canvasElement = canvas.upperCanvasEl;
    const canvasBoundingRect = canvasElement.getBoundingClientRect();
    const virtualSize = {
        width: canvas.width,
        height: canvas.height
    };

    const decimalPosition = new Position(
        coords.x / canvasBoundingRect.width,
        coords.y / canvasBoundingRect.height
    )
    const relativeCanvasPosition = new Position(
        decimalPosition.x * virtualSize.width * pixelRatio * zoom,
        decimalPosition.y * virtualSize.height * pixelRatio * zoom
    )
    const decimalOffset = new Position(
        vpt[4] / canvasBoundingRect.width,
        vpt[5] / canvasBoundingRect.height
    )

    const relativeCanvasOffset = new Position(
        decimalOffset.x * virtualSize.width * pixelRatio,
        decimalOffset.y * virtualSize.height * pixelRatio
    )

    return new Position(
        relativeCanvasPosition.x - relativeCanvasOffset.x - canvasBoundingRect.left,
        relativeCanvasPosition.y - relativeCanvasOffset.y - canvasBoundingRect.top
    );
}