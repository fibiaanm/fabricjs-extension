import {Canvas} from "fabric";

export const VirtualizeSize = (size: number, fabricCanvas: Canvas) => {
    const wrapper = fabricCanvas.wrapperEl;
    const canvas = fabricCanvas.upperCanvasEl;

    const wrapperBounds = wrapper.getBoundingClientRect();
    const canvasBounds = new DOMRect(0, 0, canvas.width, canvas.height);

    const scale = canvasBounds.width / wrapperBounds.width / window.devicePixelRatio;
    return size * scale;
}