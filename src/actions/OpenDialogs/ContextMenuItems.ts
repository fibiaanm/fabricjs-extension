import {ExecutableActions} from "../interfaces/ExecutableActions.ts";

export class ContextMenuItems {

    constructor(
        private executableActions: ExecutableActions[]
    ) {
        this.sort();
        console.log('executableActions', executableActions);
    }

    private sort() {
        this.executableActions.sort((a, b) => {
            const aOrder = a.contextual?.order ?? '0,0';
            const bOrder = b.contextual?.order ?? '0,0';
            return aOrder.localeCompare(bOrder);
        });
    }
}