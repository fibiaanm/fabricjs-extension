import { default as Dialog, buttonCallbacks } from './Dialog.ts';
import { default as Position } from '../../primitives/Position.ts';

type openDialogWithButtonActions = {
    coords: Position;
    title?: string;
    acceptLabel?: string;
    cancelLabel?: string;
    clearLabel?: string;
    useClickOutside?: boolean;
};
export declare class DialogWithButtonActions extends Dialog {
    private callbacks;
    constructor(callbacks: buttonCallbacks);
    open(props: openDialogWithButtonActions): void;
}
export {};
//# sourceMappingURL=DialogWithButtonActions.d.ts.map