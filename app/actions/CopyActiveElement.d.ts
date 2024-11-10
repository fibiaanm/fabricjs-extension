import { Canvas } from 'fabric';
import { ExecutableActions } from './interfaces/ExecutableActions.ts';

export type CopyActiveElementConfig = boolean;
export declare class CopyActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: CopyActiveElementConfig): CopyActiveElement;
    constructor(canvas: Canvas);
    private copyActiveElement;
    execute(): void;
    destroy(): void;
}
//# sourceMappingURL=CopyActiveElement.d.ts.map