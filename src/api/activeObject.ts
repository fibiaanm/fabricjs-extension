import {ExecutableActionsList} from "../actions/list.ts";
import {contextualProps} from "./main.ts";

export const activeObject = (actions: ExecutableActionsList) => {

    return {
        delete: () => {
            actions.deleteActiveElement?.execute();
        },
        rotate: (props: contextualProps) => {
            actions.rotateActiveElement?.execute(props);
        },
        scale: (props: contextualProps) => {
            actions.scaleActiveElement?.execute(props);
        },
        move: (props: contextualProps) => {
            actions.moveActiveElement?.execute(props);
        },
        changeColor: (props: contextualProps) => {
            actions.changeColorActiveElement?.execute(props);
        },
        crop: () => {
            actions.cropActiveElement?.execute();
        },
        copy: () => {
            actions.copyActiveElement?.execute();
        },
        paste: () => {
            actions.pasteAnyElement?.execute();
        }
    }
}

export type ActiveObjectAPI = ReturnType<typeof activeObject>;