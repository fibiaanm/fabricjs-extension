import {DeleteActiveElement} from "./DeleteActiveElement.ts";
import {RotationPointCustomization} from "./RotationPointCustomization.ts";
import {CropActiveElement} from "./CropActiveElement.ts";
import {RotateByInterval} from "./RotateByInterval.ts";
import {RotateActiveElement} from "./ContextualActions/RotateActiveElement.ts";
import {CopyActiveElement} from "./CopyActiveElement.ts";
import {PasteAnyElement} from "./PasteAnyElement.ts";
import {ScaleActiveElement} from "./ContextualActions/ScaleActiveElement.ts";
import {MoveActiveElement} from "./ContextualActions/MoveActiveElement.ts";
import {ChangeColorActiveElement} from "./ContextualActions/ChangeColorActiveElement.ts";
import {ApplyZoom} from "./Canvas/ApplyZoom.ts";
import {ApplyPan} from "./Canvas/ApplyPan.ts";
import {PanToCenter} from "./Canvas/PanToCenter.ts";
import {ChangeZoomRatio} from "./ContextualActions/ChangeZoomRatio.ts";
import {BringFrontActiveElement} from "./BringFrontActiveElement.ts";
import {PushBackActiveElement} from "./pushBackActiveElement.ts";

export const actionsList =  {
    'rotationPointCustomization': RotationPointCustomization,
    'rotateByInterval': RotateByInterval,
    'applyZoom': ApplyZoom,
    'applyPan': ApplyPan,
    'deleteActiveElement': DeleteActiveElement,
    'rotateActiveElement': RotateActiveElement,
    'scaleActiveElement': ScaleActiveElement,
    'copyActiveElement': CopyActiveElement,
    'pasteAnyElement': PasteAnyElement,
    'moveActiveElement': MoveActiveElement,
    'changeColorActiveElement': ChangeColorActiveElement,
    'panToCenter': PanToCenter,
    'changeZoomRatio': ChangeZoomRatio,
    'bringFrontActiveElement': BringFrontActiveElement,
    'pushBackActiveElement': PushBackActiveElement,
    'cropActiveElement': CropActiveElement,
}

export type ActionsAvailable = keyof typeof actionsList;