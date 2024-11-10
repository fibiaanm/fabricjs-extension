import {FabricObject} from "fabric";

export const lockingObjectActions = (obj: FabricObject, status: boolean) => {
    obj.setCoords();
    obj.lockRotation = status;
    obj.lockScalingX = status;
    obj.lockScalingY = status;
    obj.lockMovementX = status;
    obj.lockMovementY = status;
    obj.lockSkewingX = status;
    obj.lockSkewingY = status;
}