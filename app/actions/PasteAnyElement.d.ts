import { Canvas } from 'fabric';
import { ExecutableActions } from './interfaces/ExecutableActions.ts';

export type PasteAnyElementConfig = {
    allowExternalImages: boolean;
};
export declare class PasteAnyElement implements ExecutableActions {
    private canvas;
    private readonly listener;
    private config;
    static build(canvas: Canvas, config: PasteAnyElementConfig): PasteAnyElement;
    constructor(canvas: Canvas);
    private pasteData;
    execute(): void;
    private pasteText;
    private pasteImage;
}
//# sourceMappingURL=PasteAnyElement.d.ts.map