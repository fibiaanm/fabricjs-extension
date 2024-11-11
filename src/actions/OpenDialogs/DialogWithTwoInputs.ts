import Dialog from "./Dialog.ts";
import Position from "../../primitives/Position.ts";
import {truncate} from "../../utils/truncate.ts";

type openDialogWithTwoInputs = {
    coords: Position;
    title?: string;
    inputLabels?: string[];
}

export class DialogWithTwoInputs extends Dialog {

    constructor(
        private inputValues: string[],
        private doubleCallback: (value: string[]) => void,
    ) {
        super();
    }

    public open(
        props: openDialogWithTwoInputs
    ) {
        const div = this.createWindow({
            coords: props.coords,
            title: props.title
        });

        const callback = () => {
            this.doubleCallback([input1.value, input2.value]);
        }

        const inputsContainer = this.createInputsContainer();

        const {input: input1, container: container1} =
            this.createInput({
                callback,
                label: props.inputLabels?.[0],
            });
        input1.value = truncate(this.inputValues[0]);
        inputsContainer.appendChild(container1);

        const {input: input2, container: container2} =
            this.createInput({
                callback,
                label: props.inputLabels?.[1],
            });
        input2.value = truncate(this.inputValues[1]);
        inputsContainer.appendChild(container2);
        div.appendChild(inputsContainer);


        const {container, accept, cancel} = this.createAcceptCancelButtons();

        accept.addEventListener('click', () => {
            callback();
            if (this.onClickOutside) {
                this.onClickOutside.destroy();
            }
            this.close();
        });
        cancel.addEventListener('click', () => {
            if (this.onClickOutside) {
                this.onClickOutside.destroy();
            }
            this.close();
        });

        div.appendChild(container);

        window.document.body.appendChild(div);
        setTimeout(() => {
            input1.select();
        })
        this.element = div;
    }

}