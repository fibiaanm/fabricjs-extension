const objectConfig = {
    rotationPoint: {
        size: 10,
        offsetY: -15,
    },
    rotation: {
        steps: 15
    },
    cropBox: {
        FILL_STYLE: 'white',
        EDGE: {
            HORIZONTAL: { WIDTH: 40, HEIGHT: 10 },
            VERTICAL: { WIDTH: 10, HEIGHT: 40 },
            CORNER_RADIUS: 10
        },
        CORNER: {
            SIZE: 10,
            CORNER_RADIUS: 40
        },
        CORNER_SIZE: 14
    }
}

export type CropBoxConfig = typeof objectConfig.cropBox;
export default objectConfig;