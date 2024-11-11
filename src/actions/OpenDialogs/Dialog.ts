import {makeMovable} from "../../utils/makeMovable.ts";
import {withNumericEvents} from "../../utils/inputs/withNumericEvents.ts";
import checkSVG from "../../resources/checkSVG.ts";
import cancelSVG from "../../resources/cancelSVG.ts";
import blockSVG from "../../resources/blockSVG.ts";
import {elementInsideWindowFrame} from "../../utils/elementInsideWindowFrame.ts";
import {dialogStyles} from "./DialogStyles.ts";
import {
    inputCallback,
    buttonCallbacks,
    SVGProps,
    createWindowProps,
    createInputProps,
    TonClickOutside
} from "../interfaces/DialogProperties.ts";
import {DialogButtonsBuilder} from "./DialogButtonsBuilder.ts";
import {onClickOutside} from "../../utils/onClickOutside.ts";


export default class {
    protected makeMovable = true
    protected movable: any;
    protected element: HTMLElement | undefined;
    protected onClickOutside: TonClickOutside | undefined;
    protected inputCallback: inputCallback = () => {};

    private onCloseCallbacks: (() => void)[] = [];

    protected createWindow(props: createWindowProps) {
        const div = document.createElement("div");
        div.classList.add(...dialogStyles.window.split(' '));
        div.style.top = `${props.coords.y}px`;
        div.style.left = `${props.coords.x}px`;
        if (this.makeMovable) {
            this.movable = makeMovable(div);
            elementInsideWindowFrame(div);
        }
        if (!(props.useClickOutside === false))
            this.onClickOutside = onClickOutside(div, this.close.bind(this));

        if (props.title) {
            const title = document.createElement("div");
            title.classList.add(...dialogStyles.title.split(' '));
            title.textContent = props.title;
            div.appendChild(title);
        }

        div.tabIndex = 0;
        div.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape') {
                if (this.onClickOutside) {
                    this.onClickOutside.destroy();
                }
                this.close();
                return;
            } else if (ev.key === 'Enter') {
                return;
            }
            ev.stopPropagation();
        });

        return div;
    }

    protected createInput(options: createInputProps = {}) {

        const container = document.createElement("div");
        container.classList.add(...dialogStyles.inputs.inputsContainer.container.split(' '));

        const label = document.createElement("label");
        label.classList.add(...dialogStyles.inputs.inputsContainer.label.split(' '));
        label.textContent = options.label || '';
        container.appendChild(label);

        const input = document.createElement("input");
        input.classList.add(...dialogStyles.inputs.inputsContainer.input.split(' '));
        input.type = options.type || 'text';

        const helper = document.createElement("div");
        helper.classList.add(...dialogStyles.inputs.inputsContainer.helper.split(' '));

        const callChange = () => {
            if (options.callback) {
                options.callback(input.value);
            } else {
                this.inputCallback(input.value);
            }
        }

        if (options.type === 'color') {
            input.addEventListener('input', () => {
                callChange();
            });
        } else {
            withNumericEvents(input);
        }

        const acceptCallback = () => {
            callChange();
            if (this.onClickOutside) {
                this.onClickOutside.destroy();
            }
            this.close();
        }

        const cancelCallback = () => {
            if (this.onClickOutside) {
                this.onClickOutside.destroy();
            }
            this.close();
        }

        input.addEventListener('keydown', (ev) => {
            ev.stopPropagation();
            if (ev.key === 'Enter') acceptCallback();
            if (ev.key === 'Escape') cancelCallback();
        });
        input.addEventListener('click', () => {
            input.select();
        });

        container.appendChild(input);
        container.appendChild(helper);

        return {input, container, label};
    }

    private ACTION_BUTTON_CLASSES = ['text-xs', 'font-bold', 'rounded', 'p-0.5', 'm-0', 'duration-200', 'hover:bg-gray-200']
    protected createActionButtons(
        callbacks: buttonCallbacks
    ) {
        const container = document.createElement("div");
        container.classList.add(...dialogStyles.buttons.container.split(' '));

        const localCallback = () => {
            if (this.onClickOutside) {
                this.onClickOutside.destroy();
            }
            this.close();
        }

        const accept = document.createElement("button");
        accept.classList.add(...dialogStyles.buttons.applyButton.el.split(' '));
        accept.innerHTML = checkSVG;
        const acceptSVG = accept.querySelector('svg') as SVGElement;
        acceptSVG.classList.add(...dialogStyles.buttons.applyButton.svg.split(' '));
        const span = document.createElement("span");
        span.textContent = 'Apply';
        span.classList.add(...dialogStyles.buttons.applyButton.span.split(' '));
        accept.appendChild(span);
        this.changeSVGProps(
            acceptSVG,
            {
                width: 20,
                height: 20,
            }
        )
        accept.addEventListener('click', () => {
            callbacks.accept();
            localCallback();
        });
        container.appendChild(accept);


        const cancel = document.createElement("button");
        cancel.classList.add(...dialogStyles.buttons.cancelButton.el.split(' '));
        cancel.innerHTML = cancelSVG;
        const cancelSVGEl = cancel.querySelector('svg') as SVGElement;
        cancelSVGEl.classList.add(...dialogStyles.buttons.cancelButton.svg.split(' '));
        const cancelSpan = document.createElement("span");
        cancelSpan.textContent = 'Cancel';
        cancelSpan.classList.add(...dialogStyles.buttons.cancelButton.span.split(' '));
        cancel.appendChild(cancelSpan);
        this.changeSVGProps(
            cancelSVGEl,
            {
                width: 20,
                height: 20,
            }
        )
        cancel.addEventListener('click', () => {
            callbacks.cancel();
            localCallback();
        });
        container.appendChild(cancel);

        const clear = document.createElement("button");
        clear.classList.add(...this.ACTION_BUTTON_CLASSES);
        clear.innerHTML = blockSVG;
        this.changeSVGProps(
            clear.querySelector('svg') as SVGElement,
            {
                fill: '#FFC107',
                width: 20,
                height: 20,
            }
        )
        clear.addEventListener('click', () => {
            callbacks.clear();
            localCallback();
        });

        return {
            container,
            accept,
        }
    }

    protected createInputsContainer = () => {
        const container = document.createElement("div");
        container.classList.add(...dialogStyles.inputs.inputsContainer.el.split(' '));
        return container;
    }

    protected createAcceptCancelButtons = () => {
        const container = document.createElement("div");
        container.classList.add(...dialogStyles.inputs.buttonsContainer.el.split(' '));

        const accept = DialogButtonsBuilder.build('accept');
        container.appendChild(accept);

        const cancel = DialogButtonsBuilder.build('cancel');
        container.appendChild(cancel);

        return {container, accept, cancel};
    }

    private changeSVGProps(svg: SVGElement, props: SVGProps) {
        if (props.fill) {
            svg.style.fill = props.fill;
        }
        if (props.width) {
            svg.style.width = `${props.width}px`;
        }
        if (props.height) {
            svg.style.height = `${props.height}px`;
        }
    }

    public close() {
        if (!this.element) return;
        window.document.body.removeChild(this.element);
        this.element = undefined;
        if (this.makeMovable) {
            this.movable.destroy();
        }
        for (const callback of this.onCloseCallbacks) {
            callback();
        }
    }

    public onClose(callback: () => void) {
        this.onCloseCallbacks.push(callback);
    }

}