import { ExecutableActionsList } from '../actions/list.ts';
import { contextualProps } from './main.ts';

export declare const activeObject: (actions: ExecutableActionsList) => {
    delete: () => void;
    rotate: (props: contextualProps) => void;
    scale: (props: contextualProps) => void;
    move: (props: contextualProps) => void;
    changeColor: (props: contextualProps) => void;
    crop: () => void;
    copy: () => void;
    paste: () => void;
};
export type ActiveObjectAPI = ReturnType<typeof activeObject>;
//# sourceMappingURL=activeObject.d.ts.map