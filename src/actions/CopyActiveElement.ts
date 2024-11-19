import {Canvas} from "fabric";
import {saveJsonToClipboard} from "../utils/saveJsonToClipboard.ts";
import {ContextualProperties, ExecutableActions} from "./interfaces/ExecutableActions.ts";
import {onlyVisibleWhenObjectIsSelected} from "./OpenDialogs/ContextMenuItemVisibility.ts";
import copySVG from "../resources/copySVG.ts";

export type CopyActiveElementConfig = boolean

export class CopyActiveElement implements ExecutableActions {

    private readonly listener: (ev: KeyboardEvent) => void;
    private config: CopyActiveElementConfig = true;

    public contextual: ContextualProperties[] = [{
        name: 'Copy',
        order: '1,0',
        svg: copySVG,
        shortcut: {
            key: 'c',
            ctrl: true,
            meta: true,
        },
        visibility: () => onlyVisibleWhenObjectIsSelected(this.canvas),
        execute: this.execute.bind(this),
    }]

    static build(
        canvas: Canvas,
        config: CopyActiveElementConfig
    ): CopyActiveElement {
        const instance = new CopyActiveElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.copyActiveElement.bind(this);
        window.addEventListener("keydown", this.listener);
        this.config;
    }

    private copyActiveElement(ev: KeyboardEvent) {
        if (ev.key === 'c' && ev.ctrlKey || ev.key === 'c' && ev.metaKey) {
            this.execute();
        }
    }

    public execute() {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            const element = activeObject.toObject();
            saveJsonToClipboard({
                object: element,
                meta: {}
            });
        }
    }

    public destroy(){
        window.removeEventListener("keydown", this.listener);
    }
}