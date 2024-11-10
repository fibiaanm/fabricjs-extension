import { Canvas } from 'fabric';
import { ExecutableActions, TwoInputAction } from '../interfaces/ExecutableActions.ts';
import { default as Position } from '../../primitives/Position.ts';

export type MoveActiveElementConfig = {} & TwoInputAction;
export declare class MoveActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: MoveActiveElementConfig): MoveActiveElement;
    constructor(canvas: Canvas);
    private moveActiveElement;
    execute(coords?: Position): void;
    private moveCallback;
    destroy(): void;
}
//# sourceMappingURL=MoveActiveElement.d.ts.map