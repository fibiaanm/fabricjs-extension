import { DeleteActiveElement, DeleteActiveElementConfig } from './DeleteActiveElement.ts';
import { RotationPointCustomization, RotationPointCustomizationConfig } from './RotationPointCustomization.ts';
import { CropActiveElement, CropActiveElementConfig } from './CropActiveElement.ts';
import { RotateByInterval, RotateByIntervalConfig } from './RotateByInterval.ts';
import { RotateActiveElement, RotateActiveElementConfig } from './ContextualActions/RotateActiveElement.ts';
import { CopyActiveElement, CopyActiveElementConfig } from './CopyActiveElement.ts';
import { PasteAnyElement, PasteAnyElementConfig } from './PasteAnyElement.ts';
import { ScaleActiveElement, ScaleActiveElementConfig } from './ContextualActions/ScaleActiveElement.ts';
import { MoveActiveElement, MoveActiveElementConfig } from './ContextualActions/MoveActiveElement.ts';
import { ChangeColorActiveElement, ChangeColorActiveElementConfig } from './ContextualActions/ChangeColorActiveElement.ts';
import { ApplyZoom, ApplyZoomConfig } from './Canvas/ApplyZoom.ts';
import { ApplyPan } from './Canvas/ApplyPan.ts';
import { PanToCenter, PanToCenterConfig } from './Canvas/PanToCenter.ts';
import { ChangeZoomRatio, ChangeZoomRatioConfig } from './ContextualActions/ChangeZoomRatio.ts';
import { BringFrontActiveElement, BringFrontActiveElementConfig } from './BringFrontActiveElement.ts';
import { PushBackActiveElement, PushBackActiveElementConfig } from './pushBackActiveElement.ts';
import { ExecutableActionBuilder, ExecutableActions } from './interfaces/ExecutableActions.ts';

export declare const actionsList: {
    rotationPointCustomization: typeof RotationPointCustomization;
    rotateByInterval: typeof RotateByInterval;
    applyZoom: typeof ApplyZoom;
    applyPan: typeof ApplyPan;
    deleteActiveElement: typeof DeleteActiveElement;
    copyActiveElement: typeof CopyActiveElement;
    pasteAnyElement: typeof PasteAnyElement;
    rotateActiveElement: typeof RotateActiveElement;
    scaleActiveElement: typeof ScaleActiveElement;
    moveActiveElement: typeof MoveActiveElement;
    changeColorActiveElement: typeof ChangeColorActiveElement;
    cropActiveElement: typeof CropActiveElement;
    panToCenter: typeof PanToCenter;
    bringFrontActiveElement: typeof BringFrontActiveElement;
    pushBackActiveElement: typeof PushBackActiveElement;
    changeZoomRatio: typeof ChangeZoomRatio;
};
export type ActionsListBuilder = {
    [key in keyof typeof actionsList]: ExecutableActionBuilder;
};
export type ActionsAvailable = keyof typeof actionsList | '*';
export type ExecutableActionsList = {
    [key in ActionsAvailable]?: ExecutableActions;
};
export type ActionsToInstallConfig = {
    '*'?: boolean;
    'rotationPointCustomization'?: RotationPointCustomizationConfig;
    'rotateByInterval'?: RotateByIntervalConfig;
    'applyZoom'?: ApplyZoomConfig;
    'applyPan'?: boolean;
    'deleteActiveElement'?: DeleteActiveElementConfig;
    'copyActiveElement'?: CopyActiveElementConfig;
    'pasteAnyElement'?: PasteAnyElementConfig;
    'rotateActiveElement'?: RotateActiveElementConfig;
    'scaleActiveElement'?: ScaleActiveElementConfig;
    'moveActiveElement'?: MoveActiveElementConfig;
    'changeColorActiveElement'?: ChangeColorActiveElementConfig;
    'cropActiveElement'?: CropActiveElementConfig;
    'panToCenter'?: PanToCenterConfig;
    'bringFrontActiveElement'?: BringFrontActiveElementConfig;
    'pushBackActiveElement'?: PushBackActiveElementConfig;
    'changeZoomRatio'?: ChangeZoomRatioConfig;
};
//# sourceMappingURL=list.d.ts.map