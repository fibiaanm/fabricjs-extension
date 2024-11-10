import { Canvas } from 'fabric';
import { ExecutableActions } from './interfaces/ExecutableActions.ts';

export type PushBackActiveElementConfig = {};
export declare class PushBackActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: PushBackActiveElementConfig): PushBackActiveElement;
    constructor(canvas: Canvas);
    private pushBackActiveElement;
    execute(behindAll: boolean): void;
    private sendToBack;
    private sendBackwards;
    destroy(): void;
}
//# sourceMappingURL=pushBackActiveElement.d.ts.map