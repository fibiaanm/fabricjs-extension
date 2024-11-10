import { default as Dialog } from './Dialog.ts';
import { default as Position } from '../../primitives/Position.ts';

type openDialogWithTwoInputs = {
    coords: Position;
    title?: string;
    inputLabels?: string[];
};
export declare class DialogWithTwoInputs extends Dialog {
    private inputValues;
    private doubleCallback;
    constructor(inputValues: string[], doubleCallback: (value: string[]) => void);
    open(props: openDialogWithTwoInputs): void;
}
export {};
//# sourceMappingURL=DialogWithTwoInputs.d.ts.map