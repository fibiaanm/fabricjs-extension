import { Canvas } from 'fabric';
import { ExecutableActions, OneInputAction } from '../interfaces/ExecutableActions.ts';
import { default as Position } from '../../primitives/Position.ts';

export type RotateActiveElementConfig = {} & OneInputAction;
export declare class RotateActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: RotateActiveElementConfig): RotateActiveElement;
    constructor(canvas: Canvas);
    private rotateActiveElement;
    execute(coords?: Position): void;
    private rotationCallback;
    destroy(): void;
}
//# sourceMappingURL=RotateActiveElement.d.ts.map