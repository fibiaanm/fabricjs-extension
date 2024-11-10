import { Canvas } from 'fabric';
import { ExecutableActions } from './interfaces/ExecutableActions.ts';

export type DeleteActiveElementConfig = boolean;
export declare class DeleteActiveElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: DeleteActiveElementConfig): DeleteActiveElement;
    constructor(canvas: Canvas);
    private deleteActiveElement;
    execute(): void;
    destroy(): void;
}
//# sourceMappingURL=DeleteActiveElement.d.ts.map