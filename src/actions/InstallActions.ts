import {
    ActionsAvailable,
    actionsList,
    ActionsToInstallConfig,
    ExecutableActionsList
} from "./list.ts";
import {Canvas} from "fabric";

export class InstallActions {

    public actions: ExecutableActionsList = {};

    constructor(
        private canvas: Canvas
    ) {
    }

    public install(actions: ActionsAvailable[] | '*' | ActionsToInstallConfig = '*') {
        const list = actionsList as any;
        const initializers: ExecutableActionsList = {}

        for (const k in list) {
            const key = k as ActionsAvailable | keyof ExecutableActionsList;
            const action = list[key];
            let config: Object = {};

            if (Array.isArray(actions)){
                if (!actions.includes(key) && !actions.includes('*')) {
                    continue;
                }
            } else if (typeof actions === 'string' && actions !== '*') {
                continue;
            } else if (typeof actions === 'object') {
                if (!actions[key] && !actions['*']) {
                    continue;
                } else if (actions[key]) {
                    config = actions[key];
                } else {
                }
            }

            initializers[key] = action.build(
                this.canvas,
                config ?? {}
            );

            if (action.requiresActions) {
                (initializers[key] as any).actions = initializers;
            }

        }

        this.actions = initializers;
    }

    public uninstall() {
        for (const k of Object.keys(this.actions)) {
            const key = k as ActionsAvailable | keyof ExecutableActionsList;
            (this.actions[key] as any).destroy();
        }
    }
}