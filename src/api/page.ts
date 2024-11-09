import {ExecutableActionsList} from "../actions/list.ts";
import {contextualProps} from "./main.ts";

export const page = (actions: ExecutableActionsList) => {

    return {
        zoomRatio: (props: contextualProps) => {
            actions.changeZoomRatio?.execute(props.coords);
        },
        panToCenter: () => {
            actions.panToCenter?.execute();
        },
        bringFrontActiveElement: () => {
            actions.bringFrontActiveElement?.execute();
        },
        pushBackActiveElement: () => {
            actions.pushBackActiveElement?.execute();
        }
    }
}

export type PageAPI = ReturnType<typeof page>;