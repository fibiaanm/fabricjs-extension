import { ActionsAvailable, ActionsToInstallConfig } from './list.ts';
import { Canvas } from 'fabric';

export declare class InstallActions {
    private canvas;
    actions: any;
    constructor(canvas: Canvas);
    install(actions?: ActionsAvailable[] | '*' | ActionsToInstallConfig): void;
    uninstall(): void;
}
//# sourceMappingURL=InstallActions.d.ts.map