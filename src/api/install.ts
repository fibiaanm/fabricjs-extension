import {Canvas, FabricObject} from "fabric";
import {InstallActions} from "../actions/InstallActions.ts";
import {ActionsAvailable, ActionsToInstallConfig} from "../actions/list.ts";
import {activeObject, activeObjectStatus} from "./activeObject.ts";
import {page} from "./page.ts";
import { uninstall } from "./uninstall.ts";

declare module 'fabric' {
	interface FabricObject {
		ignore: boolean;
	}
	interface SerializedObjectProps {
		ignore: boolean;
	}
}
FabricObject.customProperties = ['ignore'];

export type installOptions = {
    actionsToInstall?: ActionsAvailable[] | '*' | ActionsToInstallConfig
}

const install = (canvas: Canvas, options: installOptions = {}) => {
    const installer = new InstallActions(canvas);
    installer.install(options.actionsToInstall);
    const actions = installer.actions;
    return {
        activeObject: activeObject.call(this, actions),
        activeObjectStatus: activeObjectStatus.call(this, actions),
        page: page.call(this, actions),
        uninstall: uninstall.bind(this, actions, canvas),
    };
}

export type FabricJsExt = ReturnType<typeof install>;
export default install;