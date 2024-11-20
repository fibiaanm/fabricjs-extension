import {Canvas} from "fabric";
import {InstallActions} from "../actions/InstallActions.ts";
import {ActionsAvailable, ActionsToInstallConfig} from "../actions/list.ts";
import {activeObject, ActiveObjectAPI} from "./activeObject.ts";
import {page, PageAPI} from "./page.ts";
import { uninstall } from "./uninstall.ts";

export type installOptions = {
    actionsToInstall?: ActionsAvailable[] | '*' | ActionsToInstallConfig
}

export default (canvas: Canvas, options: installOptions = {}) => {
    const installer = new InstallActions(canvas);
    installer.install(options.actionsToInstall);
    const actions = installer.actions;
    return {
        activeObject: activeObject.call(this, actions),
        page: page.call(this, actions),
        uninstall: uninstall.bind(this, actions, canvas),
    };
}

export type FabricJsExt = {
    activeObject: ActiveObjectAPI,
    page: PageAPI,
    uninstall: () => void,
};