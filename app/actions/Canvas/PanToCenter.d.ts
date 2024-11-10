import { Canvas } from 'fabric';
import { ExecutableActions } from '../interfaces/ExecutableActions.ts';

export type PanToCenterConfig = {};
export declare class PanToCenter implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: PanToCenterConfig): PanToCenter;
    constructor(canvas: Canvas);
    private panToCenter;
    execute(): void;
    destroy(): void;
}
//# sourceMappingURL=PanToCenter.d.ts.map