import Position from "../../primitives/Position.ts";
import {ContextMenuItems} from "./ContextMenuItems.ts";

export type ContextMenuProps = {
    coords: Position;
    items: ContextMenuItems;
}

export class ContextMenu {

    constructor(
        private props: ContextMenuProps
    ) {
    }

    public open() {
        console.log('open context menu', this.props);
    }

}