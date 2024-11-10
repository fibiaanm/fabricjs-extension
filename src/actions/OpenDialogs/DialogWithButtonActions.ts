import Dialog, {buttonCallbacks} from "./Dialog.ts";
import Position from "../../primitives/Position.ts";


type openDialogWithButtonActions = {
    coords: Position;
    title?: string;
    acceptLabel?: string;
    cancelLabel?: string;
    clearLabel?: string;
    useClickOutside?: boolean;
}
export class DialogWithButtonActions extends Dialog {

    constructor(
        private callbacks: buttonCallbacks
    ) {
        super();
    }

    public open(
        props: openDialogWithButtonActions,
    ){
        const div = this.createWindow({
            coords: props.coords,
            title: props.title,
            useClickOutside: props.useClickOutside
        });
        const {
            container,
        } = this.createActionButtons(this.callbacks);

        div.appendChild(container);

        window.document.body.appendChild(div);
        div.focus();
        this.element = div;
    }

}