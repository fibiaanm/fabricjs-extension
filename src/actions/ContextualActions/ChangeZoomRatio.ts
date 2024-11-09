import {Canvas} from "fabric";
import {DialogWithOneInput} from "../OpenDialogs/DialogWithOneInput.ts";
import {isNumber} from "../../utils/isNumber.ts";
import Position from "../../primitives/Position.ts";

export class ChangeZoomRatio {

    private readonly listener: (ev: KeyboardEvent) => void;

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.changeZoomRatio.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private changeZoomRatio(ev: KeyboardEvent) {
        if (ev.key === "z" && !ev.ctrlKey && !ev.metaKey) {
            const zoom = this.canvas.getZoom();
            const wrapper = this.canvas.wrapperEl;
            const wrapperBounds = wrapper.getBoundingClientRect();
            const coords = new Position(
                wrapperBounds.left,
                wrapperBounds.top,
            );

            const zoomScaled = zoom * 100;
            const dialog = new DialogWithOneInput(
                zoomScaled.toString(),
                (value) => {
                    this.zoomRatioCallback(value);
                }
            );
            dialog.open({
                coords,
                title: 'zoom'
            });
        }
    }

    private zoomRatioCallback(value: string) {
        if (!isNumber(value)) return;
        const zoom = parseFloat(value) / 100;
        this.canvas.setZoom(zoom);
    }

    public destroy() {
        window.removeEventListener("keydown", this.listener);
    }
}