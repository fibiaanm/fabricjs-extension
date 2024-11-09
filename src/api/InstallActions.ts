import {ActionsAvailable, actionsList} from "../actions/list.ts";
import {Canvas} from "fabric";


export class InstallActions {

    private actions: any = {};

    constructor(
        private canvas: Canvas
    ) {
    }

    public install(actions: ActionsAvailable[] | '*' = '*') {
        const list: any = actionsList;
        const initializers: any = {}

        for (const k in list) {
            const key = k as ActionsAvailable;
            const action = list[key];
            if (actions !== '*' && !actions.includes(key)) {
                continue;
            }
            initializers[key] = new action(this.canvas);
        }

        this.actions = initializers;
    }

    public uninstall() {
        for (const key of Object.keys(this.actions)) {
            this.actions[key].destroy();
        }
    }
}