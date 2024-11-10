import { Canvas } from 'fabric';
import { UserDependentActions } from './interfaces/userDependentActions.ts';
import { DecisionAction } from './interfaces/ExecutableActions.ts';

export type CropActiveElementConfig = {} & DecisionAction;
export declare class CropActiveElement implements UserDependentActions {
    private canvas;
    private activeObject;
    private readonly listener;
    private cropHelpers;
    private dialog;
    private config;
    static build(canvas: Canvas, config: CropActiveElementConfig): CropActiveElement;
    constructor(canvas: Canvas);
    private removeHelpers;
    apply(): void;
    cancel(): void;
    clear(): void;
    start(ev: KeyboardEvent): void;
    execute(): void;
    setupCrop(): Promise<void>;
}
//# sourceMappingURL=CropActiveElement.d.ts.map