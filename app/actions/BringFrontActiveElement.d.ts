import { Canvas } from 'fabric';
import { ExecutableActions } from './interfaces/ExecutableActions.ts';

export type BringFrontActiveElementConfig = {};
export declare class BringFrontActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: BringFrontActiveElementConfig): BringFrontActiveElement;
    constructor(canvas: Canvas);
    private bringFrontActiveElement;
    execute(inFrontOfAll: boolean): void;
    private bringInFrontOfAll;
    private bringForward;
    destroy(): void;
}
//# sourceMappingURL=BringFrontActiveElement.d.ts.map