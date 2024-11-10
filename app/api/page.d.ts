import { ExecutableActionsList } from '../actions/list.ts';
import { contextualProps } from './main.ts';

export declare const page: (actions: ExecutableActionsList) => {
    zoomRatio: (props: contextualProps) => void;
    panToCenter: () => void;
    bringFrontActiveElement: () => void;
    pushBackActiveElement: () => void;
};
export type PageAPI = ReturnType<typeof page>;
//# sourceMappingURL=page.d.ts.map