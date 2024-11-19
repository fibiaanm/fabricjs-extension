import install from "./api/install";
import Position from "./primitives/Position";
export { install, Position };

import './index.css';

export type { ActionsAvailable} from "./actions/list";
export type {ActiveObjectAPI} from "./api/activeObject";
export type {PageAPI} from "./api/page";
export type {installOptions, FabricJsExt} from "./api/install";
export type { RotationPointCustomizationConfig } from "./actions/RotationPointCustomization";
export type { RotateByIntervalConfig } from "./actions/RotateByInterval";
export type { DeleteActiveElementConfig } from "./actions/DeleteActiveElement";
export type { CopyActiveElementConfig } from "./actions/CopyActiveElement";
export type { PasteAnyElementConfig } from "./actions/PasteAnyElement";
export type { RotateActiveElementConfig } from "./actions/ContextualActions/RotateActiveElement";
export type { ScaleActiveElementConfig } from "./actions/ContextualActions/ScaleActiveElement";
export type { MoveActiveElementConfig } from "./actions/ContextualActions/MoveActiveElement";
export type { ChangeColorActiveElementConfig } from "./actions/ContextualActions/ChangeColorActiveElement";
export type { PanToCenterConfig } from "./actions/Canvas/PanToCenter";
export type { ChangeZoomRatioConfig } from "./actions/ContextualActions/ChangeZoomRatio";
export type { BringFrontActiveElementConfig } from "./actions/BringFrontActiveElement";
export type { PushBackActiveElementConfig } from "./actions/pushBackActiveElement";
export type { ExecutableActionsList, ActionsToInstallConfig, ActionsListBuilder } from "./actions/list";
export type { ExecutableActionBuilder } from "./actions/interfaces/ExecutableActions";

export { extensionCustomWindowEvents } from "./actions/list";
