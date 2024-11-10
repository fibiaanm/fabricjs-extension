import { default as Position } from '../../primitives/Position.ts';
import { default as Dialog } from './Dialog.ts';
import { TInputSupported } from '../../utils/inputs/inputTypes.ts';

type openDialogWithOneInput = {
    coords: Position;
    title?: string;
    inputLabel?: string;
    inputType?: TInputSupported;
};
export declare class DialogWithOneInput extends Dialog {
    private inputValue;
    protected callback: (value: string) => void;
    constructor(inputValue: string, callback: (value: string) => void);
    open(props: openDialogWithOneInput): void;
}
export {};
//# sourceMappingURL=DialogWithOneInput.d.ts.map