import { Canvas } from 'fabric';

export type ApplyPanConfig = boolean;
export declare class ApplyPan {
    private canvas;
    private config;
    static build(canvas: Canvas, config: ApplyPanConfig): ApplyPan;
    constructor(canvas: Canvas);
    onMouseWheel(event: WheelEvent): void;
}
//# sourceMappingURL=ApplyPan.d.ts.map