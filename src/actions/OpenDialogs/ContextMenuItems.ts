import { buildShortcutString } from "../../utils/buildShortcutString.ts";
import {ContextualProperties, ExecutableActions} from "../interfaces/ExecutableActions.ts";
import { contextMenuStyles } from "./ContextMenuStyles.ts";

export class ContextMenuItems {

    public close: () => void = () => {};

    constructor(
        private executableActions: ContextualProperties[]
    ) {
        this.sort();
    }

    private sort() {
        this.executableActions.sort((a, b) => {
            const aOrder = a.order ?? '0,0';
            const bOrder = b.order ?? '0,0';
            return aOrder.localeCompare(bOrder);
        });
    }

    public render() {
        const ul = document.createElement('ul');
        ul.classList.add(...contextMenuStyles.list.el.split(' '));
        this.executableActions.forEach((contextual: ContextualProperties) => {
            const visibility = contextual.visibility?.();
            if (visibility === 'hidden') return;

            const li = document.createElement('li');
            li.classList.add(
                ...contextMenuStyles.list.element.el.split(' '),
                ...contextMenuStyles.list.element.el_normal.split(' '),
            );

            const helper = document.createElement('div');
            helper.classList.add(...contextMenuStyles.list.element.helper.split(' '));
            li.append(helper);

            li.innerHTML += contextual.svg ?? '<svg></svg>';
            const svg = li.querySelector('svg');
            if (svg) {
                svg.classList.add(...contextMenuStyles.list.element.svg.split(' '));
            }

            const span = document.createElement('span');
            span.classList.add(...contextMenuStyles.list.element.span.split(' '));
            span.innerHTML = contextual.name;
            li.append(span);

            const shortcut = document.createElement('span');
            shortcut.classList.add(...contextMenuStyles.list.element.shortcut.split(' '));
            shortcut.innerHTML = buildShortcutString(contextual.shortcut ?? {});
            li.append(shortcut);

            this.setUpActionListeners(contextual, li);

            ul.append(li);
        });

        return ul;
    }

    private setUpActionListeners(contextual: ContextualProperties, li: HTMLElement) {
        li.addEventListener('click', () => {
            contextual.execute?.();
            this.close();
        });
    }

    static makeActionsPlain(actions: ExecutableActions[]) {
        const plainActions: ContextualProperties[] = [];
        actions.forEach((action) => {
            if (action.contextual) {
                plainActions.push(...action.contextual);
            }
        });
        return plainActions;
    }

}