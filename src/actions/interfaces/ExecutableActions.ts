import Position from "../../primitives/Position.ts";
import {buttonCallbacks} from "./DialogProperties.ts";

export type oneInputUpdateCallback = (value: string) => void;
export type TwoInputUpdateCallback = (value: string[]) => void;
export type OneInputAction = {
    open?: (coords: Position, update: oneInputUpdateCallback) => void;
}
export type TwoInputAction = {
    open?: (coords: Position, update: TwoInputUpdateCallback) => void;
}
export type DecisionAction = {
    open?: (coords: Position, callbacks: buttonCallbacks) => void;
}

export type ShortcutDetail = {
    key: string;
    shift?: boolean;
    alt?: boolean;
    ctrl?: boolean;
    meta?: boolean;
}

export type VisibilityStatus = 'visible' | 'hidden' | 'disabled';

export type ContextualProperties = {
    order?: string;
    shortcut?: ShortcutDetail;
    name: string;
    svg?: string;
    visibility?: () => VisibilityStatus;
    execute?: (...args: unknown[]) => void;
}

export interface ExecutableActions {
    execute(params?: Object): void;
    contextual?: ContextualProperties[];
}

export interface ExecutableActionBuilder {
    build(...args: unknown[]): ExecutableActions;
    requiresActions?: boolean;
}