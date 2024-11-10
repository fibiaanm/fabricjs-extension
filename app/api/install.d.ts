import { Canvas } from 'fabric';
import { ActionsAvailable, ActionsToInstallConfig } from '../actions/list.ts';
import { ActiveObjectAPI } from './activeObject.ts';
import { PageAPI } from './page.ts';

export type installOptions = {
    actionsToInstall?: ActionsAvailable[] | '*' | ActionsToInstallConfig;
};
declare const _default: (canvas: Canvas, options?: installOptions) => {
    activeObject: {
        delete: () => void;
        rotate: (props: import('./main.ts').contextualProps) => void;
        scale: (props: import('./main.ts').contextualProps) => void;
        move: (props: import('./main.ts').contextualProps) => void;
        changeColor: (props: import('./main.ts').contextualProps) => void;
        crop: () => void;
        copy: () => void;
        paste: () => void;
    };
    page: {
        zoomRatio: (props: import('./main.ts').contextualProps) => void;
        panToCenter: () => void;
        bringFrontActiveElement: () => void;
        pushBackActiveElement: () => void;
    };
};
export default _default;
export type FabricJsExt = {
    activeObject: ActiveObjectAPI;
    page: PageAPI;
};
//# sourceMappingURL=install.d.ts.map