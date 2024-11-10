declare const objectConfig: {
    rotationPoint: {
        size: number;
        offsetY: number;
    };
    rotation: {
        steps: number;
    };
    cropBox: {
        FILL_STYLE: string;
        EDGE: {
            HORIZONTAL: {
                WIDTH: number;
                HEIGHT: number;
            };
            VERTICAL: {
                WIDTH: number;
                HEIGHT: number;
            };
            CORNER_RADIUS: number;
        };
        CORNER: {
            SIZE: number;
            CORNER_RADIUS: number;
        };
        CORNER_SIZE: number;
    };
};
export type CropBoxConfig = typeof objectConfig.cropBox;
export default objectConfig;
//# sourceMappingURL=objects.d.ts.map