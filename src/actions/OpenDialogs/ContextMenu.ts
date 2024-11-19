import Position from "../../primitives/Position.ts";
import { elementInsideWindowFrame } from "../../utils/elementInsideWindowFrame.ts";
import { onClickOutside } from "../../utils/onClickOutside.ts";
import {ContextMenuItems} from "./ContextMenuItems.ts";
import { contextMenuStyles } from "./ContextMenuStyles.ts";

export type ContextMenuProps = {
    coords: Position;
    items: ContextMenuItems;
}

export class ContextMenu {


    private container: HTMLElement | undefined;
    private _props: ContextMenuProps | undefined;

    constructor(
    ) {
    }

    public set props(props: ContextMenuProps) {
        this._props = props;
    }
    public get props() {
        if (!this._props) throw new Error('props not set');
        return this._props;
    }

    public open(ul: HTMLElement) {
        this.container = document.createElement('div');
        this.container.classList.add(...contextMenuStyles.container.split(' '));
        this.container.style.left = `${this.props.coords.x}px`;
        this.container.style.top = `${this.props.coords.y}px`;
        this.container.append(ul);
        document.body.append(this.container);
        onClickOutside(this.container, this.close.bind(this));
        elementInsideWindowFrame(this.container);
    }

    public close() {
        if (!this.container) return;
        this.container.remove();
        this._props = undefined;
        this.container = undefined;
    }

}