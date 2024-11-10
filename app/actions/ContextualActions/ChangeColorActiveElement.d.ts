import { Canvas } from 'fabric';
import { ExecutableActions, OneInputAction } from '../interfaces/ExecutableActions.ts';
import { default as Position } from '../../primitives/Position.ts';

export type ChangeColorActiveElementConfig = {} & OneInputAction;
export declare class ChangeColorActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: ChangeColorActiveElementConfig): ChangeColorActiveElement;
    constructor(canvas: Canvas);
    private changeColorActiveElement;
    execute(coords?: Position): void;
    private changeColorCallback;
    destroy(): void;
}
//# sourceMappingURL=ChangeColorActiveElement.d.ts.map