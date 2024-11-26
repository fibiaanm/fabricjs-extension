import Position from "../../primitives/Position.ts";
import {TInputSupported} from "../../utils/inputs/inputTypes.ts";

export type createWindowProps = {
    coords: Position;
    title?: string;
    useClickOutside?: boolean;
}
export type createInputProps = {
    callback?: (value: string) => void;
    label?: string;
    type?: TInputSupported;
}
export type TonClickOutside = {
    destroy: () => void;
}
export type SVGProps = {
    fill?: string;
    width?: number;
    height?: number;
}
export type inputCallback = (value: string) => void;
export type buttonCallbacks = {
    'accept': () => void;
    'cancel': () => void;
    'clear': () => void;
    'objectStatus': () => void;
}