import {DeleteActiveElement, DeleteActiveElementConfig} from "./DeleteActiveElement.ts";
import {RotationPointCustomization, RotationPointCustomizationConfig} from "./RotationPointCustomization.ts";
import {CropActiveElement, CropActiveElementConfig} from "./CropActiveElement.ts";
import {RotateByInterval, RotateByIntervalConfig} from "./RotateByInterval.ts";
import {RotateActiveElement, RotateActiveElementConfig} from "./ContextualActions/RotateActiveElement.ts";
import {CopyActiveElement, CopyActiveElementConfig} from "./CopyActiveElement.ts";
import {PasteAnyElement, PasteAnyElementConfig} from "./PasteAnyElement.ts";
import {ScaleActiveElement, ScaleActiveElementConfig} from "./ContextualActions/ScaleActiveElement.ts";
import {MoveActiveElement, MoveActiveElementConfig} from "./ContextualActions/MoveActiveElement.ts";
import {
    ChangeColorActiveElement,
    ChangeColorActiveElementConfig
} from "./ContextualActions/ChangeColorActiveElement.ts";
import {ApplyZoom, ApplyZoomConfig} from "./Canvas/ApplyZoom.ts";
import {ApplyPan} from "./Canvas/ApplyPan.ts";
import {PanToCenter, PanToCenterConfig} from "./Canvas/PanToCenter.ts";
import {ChangeZoomRatio, ChangeZoomRatioConfig} from "./ContextualActions/ChangeZoomRatio.ts";
import {BringFrontActiveElement, BringFrontActiveElementConfig} from "./BringFrontActiveElement.ts";
import {PushBackActiveElement, PushBackActiveElementConfig} from "./pushBackActiveElement.ts";
import {ExecutableActionBuilder, ExecutableActions} from "./interfaces/ExecutableActions.ts";
import {DropImagesOnCanvas} from "./DropImagesOnCanvas.ts";
import {ZoomWithPinch} from "./MobileSupport/ZoomWithPinch.ts";
import {ContextMenuHandler} from "./ContextMenuHandler.ts";

export const actionsList =  {
    // General actions
    'rotationPointCustomization': RotationPointCustomization,
    'rotateByInterval': RotateByInterval,
    'applyZoom': ApplyZoom,
    'applyPan': ApplyPan,

    // actions for objects
    'deleteActiveElement': DeleteActiveElement,
    'copyActiveElement': CopyActiveElement,
    'pasteAnyElement': PasteAnyElement,
    // Contextual actions for objects
    'rotateActiveElement': RotateActiveElement,
    'scaleActiveElement': ScaleActiveElement,
    'moveActiveElement': MoveActiveElement,
    'changeColorActiveElement': ChangeColorActiveElement,
    'cropActiveElement': CropActiveElement,

    // Canvas actions
    'panToCenter': PanToCenter,
    'bringFrontActiveElement': BringFrontActiveElement,
    'pushBackActiveElement': PushBackActiveElement,
    'dropImagesOnCanvas': DropImagesOnCanvas,
    // Contextual actions for canvas
    'changeZoomRatio': ChangeZoomRatio,

    // Mobile support:
    'zoomWithPinch': ZoomWithPinch,
    'contextMenuHandler': ContextMenuHandler,
}

export type ActionsListBuilder = {
    [key in keyof typeof actionsList]: ExecutableActionBuilder
}

export type ActionsAvailable = keyof typeof actionsList | '*';
export type ExecutableActionsList = {
    [key in ActionsAvailable]?: ExecutableActions
}

export type ActionsToInstallConfig = {
    '*'?: boolean
    'rotationPointCustomization'?: RotationPointCustomizationConfig,
    'rotateByInterval'?: RotateByIntervalConfig,
    'applyZoom'?: ApplyZoomConfig,
    'applyPan'?: boolean,
    'deleteActiveElement'?: DeleteActiveElementConfig,
    'copyActiveElement'?: CopyActiveElementConfig,
    'pasteAnyElement'?: PasteAnyElementConfig,
    'rotateActiveElement'?: RotateActiveElementConfig,
    'scaleActiveElement'?: ScaleActiveElementConfig,
    'moveActiveElement'?: MoveActiveElementConfig,
    'changeColorActiveElement'?: ChangeColorActiveElementConfig,
    'cropActiveElement'?: CropActiveElementConfig,
    'panToCenter'?: PanToCenterConfig,
    'bringFrontActiveElement'?: BringFrontActiveElementConfig,
    'pushBackActiveElement'?: PushBackActiveElementConfig,
    'changeZoomRatio'?: ChangeZoomRatioConfig,
    'dropImagesOnCanvas'?: boolean,
    'zoomWithPinch'?: boolean,
    'contextMenuHandler'?: boolean,
}