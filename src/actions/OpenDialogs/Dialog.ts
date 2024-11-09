import Position from "../../primitives/Position.ts";
import {makeMovable} from "../../utils/makeMovable.ts";
import {onClickOutside} from "../../utils/onClickOutside.ts";
import {withNumericEvents} from "../../utils/inputs/withNumericEvents.ts";
import {TInputSupported} from "../../utils/inputs/inputTypes.ts";
import checkSVG from "../../resources/checkSVG.ts";
import cancelSVG from "../../resources/cancelSVG.ts";
import blockSVG from "../../resources/blockSVG.ts";
import {elementInsideWindowFrame} from "../../utils/elementInsideWindowFrame.ts";

type createWindowProps = {
    coords: Position;
    title?: string;
    useClickOutside?: boolean;
}
type createInputProps = {
    callback?: (value: string) => void;
    label?: string;
    type?: TInputSupported;
}
type onClickOutside = {
    destroy: () => void;
}
type SVGProps = {
    fill?: string;
    width?: number;
    height?: number;
}
type inputCallback = (value: string) => void;
export type buttonCallbacks = {
    'accept': () => void;
    'cancel': () => void;
    'clear': () => void;
}
export default class {
    protected makeMovable = true
    protected movable: any;
    protected element: HTMLElement | undefined;
    protected onClickOutside: onClickOutside | undefined;
    protected inputCallback: inputCallback = () => {};

    private onCloseCallbacks: (() => void)[] = [];

    protected createWindow(props: createWindowProps) {
        const div = document.createElement("div");
        div.classList.add('fixed', 'bg-white', 'bg-opacity-70', 'w-24', 'select-none', 'backdrop-blur-md', 'rounded', 'shadow', 'flex', 'items-center', 'flex-wrap', 'cursor-move');
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
            title.classList.add('w-full', 'text-center', 'text-xs', 'font-bold');
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
        container.classList.add('flex', 'w-full', 'p-1', 'items-center');

        const label = document.createElement("label");
        label.classList.add('text-xs', 'text-center', 'flex-1');
        label.textContent = options.label || '';
        container.appendChild(label);

        const input = document.createElement("input");
        input.classList.add('border-0', 'border-gray-300', 'bg-transparent', 'rounded', 'focus:outline-none', 'text-center', 'w-full', 'text-xs');
        input.type = options.type || 'text';

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

        input.addEventListener('keydown', (ev) => {
            ev.stopPropagation();
            if (ev.key === 'Enter') {
                callChange();
                if (this.onClickOutside) {
                    this.onClickOutside.destroy();
                }
                this.close();
            }
            if (ev.key === 'Escape') {
                if (this.onClickOutside) {
                    this.onClickOutside.destroy();
                }
                this.close();
            }
        });
        input.addEventListener('click', () => {
            input.select();
        });

        container.appendChild(input);

        return {input, container, label};
    }

    private ACTION_BUTTON_CLASSES = ['text-xs', 'font-bold', 'rounded', 'p-0.5', 'm-0', 'duration-200', 'hover:bg-gray-200']
    protected createActionButtons(
        callbacks: buttonCallbacks
    ) {
        const container = document.createElement("div");
        container.classList.add('flex', 'w-full', 'p-1', 'items-center', 'justify-around');

        const localCallback = () => {
            if (this.onClickOutside) {
                this.onClickOutside.destroy();
            }
            this.close();
        }

        const accept = document.createElement("button");
        accept.classList.add(...this.ACTION_BUTTON_CLASSES);
        accept.innerHTML = checkSVG;
        this.changeSVGProps(
            accept.querySelector('svg') as SVGElement,
            {
                fill: '#A4D3A1',
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
        cancel.classList.add(...this.ACTION_BUTTON_CLASSES);
        cancel.innerHTML = cancelSVG;
        this.changeSVGProps(
            cancel.querySelector('svg') as SVGElement,
            {
                fill: '#F28B82',
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