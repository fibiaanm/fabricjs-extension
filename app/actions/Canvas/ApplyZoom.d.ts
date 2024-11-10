import { Canvas } from 'fabric';

export type ApplyZoomConfig = boolean;
export declare class ApplyZoom {
    private canvas;
    private readonly listener;
    private minZoom;
    private maxZoom;
    private config;
    static build(canvas: Canvas, config: ApplyZoomConfig): ApplyZoom;
    constructor(canvas: Canvas);
    private handleMouseWheel;
}
//# sourceMappingURL=ApplyZoom.d.ts.map