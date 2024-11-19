import {dialogStyles, TDialogStylesInputsButtons} from "./DialogStyles.ts";

type buttonType = 'accept' | 'cancel' | 'clear';

export class DialogButtonsBuilder {

    public static build(type: buttonType) {
        let style: TDialogStylesInputsButtons = {} as TDialogStylesInputsButtons;
        let label = '';

        if (type === 'accept') {
            style = dialogStyles.inputs.buttonsContainer.applyButton;
            label = 'Apply';
        } else if (type === 'cancel') {
            style = dialogStyles.inputs.buttonsContainer.cancelButton;
            label = 'Cancel';
        }

        return DialogButtonsBuilder.createButton(label, style);
    }

    private static createButton(label: string, style: TDialogStylesInputsButtons) {
        const button = document.createElement("button");
        button.classList.add(...style.el.split(' '));
        const span = document.createElement("span");
        span.classList.add(...style.span.split(' '));
        span.textContent = label;
        button.appendChild(span);
        const helper = document.createElement("div");
        helper.classList.add(...style.helper.split(' '));
        button.appendChild(helper);
        return button;
    }

}