import {
    ActionsAvailable,
    actionsList,
    ActionsToInstallConfig,
    ExecutableActionsList
} from "./list.ts";
import {Canvas} from "fabric";

export class InstallActions {

    public actions: any = {};

    constructor(
        private canvas: Canvas
    ) {
    }

    public install(actions: ActionsAvailable[] | '*' | ActionsToInstallConfig = '*') {
        const list = actionsList as any;
        const initializers: ExecutableActionsList = {}

        for (const k in list) {
            const key = k as ActionsAvailable;
            const action = list[key];
            let config: Object = {};

            if (Array.isArray(actions)){
                if (!actions.includes(key) && !actions.includes('*')) {
                    continue;
                }
            } else if (typeof actions === 'string' && actions !== '*') {
                continue;
            } else if (typeof actions === 'object' && !actions['*']) {
                if (!actions[key]) {
                    continue;
                } else {
                    config = actions[key];
                }
            }

            initializers[key] = action.build(
                this.canvas,
                config ?? {}
            );
        }

        this.actions = initializers;
    }

    public uninstall() {
        for (const key of Object.keys(this.actions)) {
            this.actions[key].destroy();
        }
    }
}