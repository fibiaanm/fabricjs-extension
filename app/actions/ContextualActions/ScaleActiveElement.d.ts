import { Canvas } from 'fabric';
import { ExecutableActions, TwoInputAction } from '../interfaces/ExecutableActions.ts';
import { default as Position } from '../../primitives/Position.ts';

export type ScaleActiveElementConfig = {} & TwoInputAction;
export declare class ScaleActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: ScaleActiveElementConfig): ScaleActiveElement;
    constructor(canvas: Canvas);
    private scaleActiveElement;
    execute(coords?: Position): void;
    private scaleCallback;
}
//# sourceMappingURL=ScaleActiveElement.d.ts.map