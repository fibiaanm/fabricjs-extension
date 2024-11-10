import { default as Position } from '../../primitives/Position.ts';
import { onClickOutside } from '../../utils/onClickOutside.ts';
import { TInputSupported } from '../../utils/inputs/inputTypes.ts';

type createWindowProps = {
    coords: Position;
    title?: string;
    useClickOutside?: boolean;
};
type createInputProps = {
    callback?: (value: string) => void;
    label?: string;
    type?: TInputSupported;
};
type onClickOutside = {
    destroy: () => void;
};
type inputCallback = (value: string) => void;
export type buttonCallbacks = {
    'accept': () => void;
    'cancel': () => void;
    'clear': () => void;
};
export default class {
    protected makeMovable: boolean;
    protected movable: any;
    protected element: HTMLElement | undefined;
    protected onClickOutside: onClickOutside | undefined;
    protected inputCallback: inputCallback;
    private onCloseCallbacks;
    protected createWindow(props: createWindowProps): HTMLDivElement;
    protected createInput(options?: createInputProps): {
        input: HTMLInputElement;
        container: HTMLDivElement;
        label: HTMLLabelElement;
    };
    private ACTION_BUTTON_CLASSES;
    protected createActionButtons(callbacks: buttonCallbacks): {
        container: HTMLDivElement;
        accept: HTMLButtonElement;
    };
    private changeSVGProps;
    close(): void;
    onClose(callback: () => void): void;
}
export {};
//# sourceMappingURL=Dialog.d.ts.map