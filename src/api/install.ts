import {Canvas} from "fabric";
import {InstallActions} from "./InstallActions.ts";
import {ActionsAvailable} from "../actions/list.ts";

export type installOptions = {
    actionsToInstall?: ActionsAvailable[] | '*'
}

export default (canvas: Canvas, options: installOptions = {}) => {
    const installer = new InstallActions(canvas);
    installer.install(options.actionsToInstall);
    return installer;
}