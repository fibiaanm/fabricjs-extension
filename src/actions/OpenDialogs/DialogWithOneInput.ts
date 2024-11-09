import Position from "../../primitives/Position.ts";
import {truncate} from "../../utils/truncate.ts";
import Dialog from "./Dialog.ts";
import {TInputSupported} from "../../utils/inputs/inputTypes.ts";

type openDialogWithOneInput = {
    coords: Position;
    title?: string;
    inputLabel?: string;
    inputType?: TInputSupported;
}

export class DialogWithOneInput extends Dialog{
    constructor(
        private inputValue: string,
        protected callback: (value: string) => void,
    ) {
        super();
        this.inputCallback = callback;
    }

    public open(
        props: openDialogWithOneInput
    ) {
        const div = this.createWindow({
            coords: props.coords,
            title: props.title
        });

        const {container, input} = this.createInput({
            label: props.inputLabel,
            type: props.inputType
        });
        if (input.type === 'text') {
            input.value = truncate(this.inputValue);
        } else {
            input.value = this.inputValue;
        }
        div.appendChild(container);

        window.document.body.appendChild(div);
        setTimeout(() => {
            input.select();
        })
        this.element = div;
    }

}