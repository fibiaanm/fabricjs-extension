import { Canvas } from 'fabric';

export type RotationPointCustomizationConfig = {
    svg?: () => string;
};
export declare class RotationPointCustomization {
    private canvas;
    private static rotatingIcon;
    private static svgSource;
    config: RotationPointCustomizationConfig;
    static get svgResource(): HTMLImageElement;
    static build(canvas: Canvas, config: RotationPointCustomizationConfig): RotationPointCustomization;
    constructor(canvas: Canvas);
    private createRotationControl;
}
//# sourceMappingURL=RotationPointCustomization.d.ts.map