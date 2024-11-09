import {Canvas} from "fabric";
import {DialogWithOneInput} from "../OpenDialogs/DialogWithOneInput.ts";
import {isNumber} from "../../utils/isNumber.ts";
import Position from "../../primitives/Position.ts";
import {ExecutableActions, OneInputAction, oneInputUpdateCallback} from "../interfaces/ExecutableActions.ts";

export type ChangeZoomRatioConfig = {} & OneInputAction

export class ChangeZoomRatio implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: ChangeZoomRatioConfig = {}

    static build(canvas: Canvas, config: ChangeZoomRatioConfig): ChangeZoomRatio {
        const instance = new ChangeZoomRatio(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.changeZoomRatio.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private changeZoomRatio(ev: KeyboardEvent) {
        if (ev.key === "z" && !ev.ctrlKey && !ev.metaKey) {
           this.execute();
        }
    }

    public execute(coords?: Position) {
        const zoom = this.canvas.getZoom();
        const wrapper = this.canvas.wrapperEl;
        const wrapperBounds = wrapper.getBoundingClientRect();
        const coordsLocal = new Position(
            coords?.x ?? wrapperBounds.left,
            coords?.y ??wrapperBounds.top,
        );
        const updateFunction: oneInputUpdateCallback = (value) => {
            this.zoomRatioCallback(value);
        }
        const updateCallback = updateFunction.bind(this)

        if (this.config?.open) {
            this.config.open(
                coordsLocal,
                updateCallback
            )
            return;
        }

        const zoomScaled = zoom * 100;
        const dialog = new DialogWithOneInput(
            zoomScaled.toString(),
            updateCallback
        );
        dialog.open({
            coords: coordsLocal,
            title: 'zoom'
        });
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