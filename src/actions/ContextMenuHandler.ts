import {Canvas} from "fabric";
import {ExecutableActionsList} from "./list.ts";
import {ExecutableActions} from "./interfaces/ExecutableActions.ts";
import {ContextMenuItems} from "./OpenDialogs/ContextMenuItems.ts";
import {ContextMenu} from "./OpenDialogs/ContextMenu.ts";
import Position from "../primitives/Position.ts";

export type ContextMeuHandlerConfig = {}

export class ContextMenuHandler {

    private listener: (e: MouseEvent) => void;
    private config: ContextMeuHandlerConfig = {};
    public actions: ExecutableActionsList = {};

    static requiresActions = true;
    static build(canvas: Canvas, config: ContextMeuHandlerConfig) {
        const instance = new ContextMenuHandler(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas,
    ) {
        this.listener = this.handleContextMenu.bind(this);
        this.canvas.wrapperEl.addEventListener('contextmenu', this.listener);
        this.config;
    }

    private handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        const coords = new Position(e.clientX, e.clientY);
        this.execute({coords});
    }

    public execute({coords}: {coords: Position}) {
        const ctxActions: ExecutableActions[] = []

        for (const k in this.actions) {
            const action = k as keyof ExecutableActionsList;
            if (this.actions[action]?.contextual) {
                ctxActions.push(this.actions[action]!)
            }
        }

        const ctxMenuItems = new ContextMenuItems(ctxActions);

        const ctxWindow = new ContextMenu({
            coords,
            items: ctxMenuItems
        });
        ctxWindow.open();
    }

    public destroy() {
        this.canvas.wrapperEl.removeEventListener('contextmenu', this.listener);
    }
}