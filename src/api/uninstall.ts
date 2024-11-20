import { Canvas } from "fabric";
import { ExecutableActionsList } from "../actions/list";

export const uninstall = (actions: ExecutableActionsList, canvas: Canvas) => {
    Object.keys(actions).forEach((key) => {
        const action = actions[key as keyof ExecutableActionsList];
        action?.destroy?.();
    });
    canvas.off();
}