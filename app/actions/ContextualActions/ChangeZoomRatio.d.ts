import { Canvas } from 'fabric';
import { default as Position } from '../../primitives/Position.ts';
import { ExecutableActions, OneInputAction } from '../interfaces/ExecutableActions.ts';

export type ChangeZoomRatioConfig = {} & OneInputAction;
export declare class ChangeZoomRatio implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: ChangeZoomRatioConfig): ChangeZoomRatio;
    constructor(canvas: Canvas);
    private changeZoomRatio;
    execute(coords?: Position): void;
    private zoomRatioCallback;
    destroy(): void;
}
//# sourceMappingURL=ChangeZoomRatio.d.ts.map