import { Canvas } from 'fabric';

export type RotateByIntervalConfig = {
    steps?: number;
};
export declare class RotateByInterval {
    config: RotateByIntervalConfig;
    static build(canvas: Canvas, config: RotateByIntervalConfig): RotateByInterval;
    constructor(canvas: Canvas);
    private checkInterval;
    private get interval();
}
//# sourceMappingURL=RotateByInterval.d.ts.map