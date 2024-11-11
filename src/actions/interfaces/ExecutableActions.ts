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

export interface ExecutableActions {
    execute(params?: Object): void;
    contextual?: {
        order?: string;
        shortcut?: string;
        name: string;
    }
}

export interface ExecutableActionBuilder {
    build(...args: unknown[]): ExecutableActions;
    requiresActions?: boolean;
}