import { FabricImage, FabricObject, Group } from 'fabric';

type TCreateCropBox = {
    outerRect: FabricObject;
    innerRect: FabricObject;
    cutOutGroup: Group;
};
export declare class CreateCropShapes {
    private activeObject;
    constructor(activeObject: FabricImage);
    createCropBox(): TCreateCropBox;
    private computeClipPathFrame;
    createControllerBox(cropBox: TCreateCropBox): FabricObject;
    private configureControlBox;
}
export {};
//# sourceMappingURL=CreateCropShapes.d.ts.map