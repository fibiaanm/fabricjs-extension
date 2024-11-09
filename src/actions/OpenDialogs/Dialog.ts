import Position from "../../primitives/Position.ts";
import {makeMovable} from "../../utils/makeMovable.ts";
import {onClickOutside} from "../../utils/onClickOutside.ts";
import {withNumericEvents} from "../../utils/inputs/withNumericEvents.ts";
import {TInputSupported} from "../../utils/inputs/inputTypes.ts";

type createWindowProps = {
    coords: Position;
    title?: string;
}
type createInputProps = {
    callback?: (value: string) => void;
    label?: string;
    type?: TInputSupported;
}
type onClickOutside = {
    destroy: () => void;
}
type inputCallback = (value: string) => void;

export default class {
    protected makeMovable = true
    protected movable: any;
    protected element: HTMLElement | undefined;
    protected onClickOutside: onClickOutside | undefined;
    protected inputCallback: inputCallback = () => {};

    protected createWindow(props: createWindowProps) {
        const div = document.createElement("div");
        div.classList.add('fixed', 'bg-white', 'bg-opacity-70', 'w-24', 'select-none', 'backdrop-blur-md', 'rounded', 'shadow', 'flex', 'items-center', 'flex-wrap', 'cursor-move');
        div.style.top = `${props.coords.y}px`;
        div.style.left = `${props.coords.x}px`;
        if (this.makeMovable) {
            this.movable = makeMovable(div);
        }
        this.onClickOutside = onClickOutside(div, this.close.bind(this));

        if (props.title) {
            const title = document.createElement("div");
            title.classList.add('w-full', 'text-center', 'text-xs', 'font-bold');
            title.textContent = props.title;
            div.appendChild(title);
        }

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
            if (ev.key === 'Escape') {
                if (this.onClickOutside) {
                    this.onClickOutside.destroy();
                }
                this.close();
                return;
            }
            if (ev.key === 'Enter') {
                callChange();
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

    protected close() {
        if (!this.element) return;
        window.document.body.removeChild(this.element);
        if (this.makeMovable) {
            this.movable.destroy();
        }
    }

}