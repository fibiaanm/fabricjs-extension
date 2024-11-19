import {Canvas, FabricObject} from "fabric";
import {ObjectBuilder} from "../pages/objects/ObjectBuilder.ts";
import {ContextualProperties, ExecutableActions} from "./interfaces/ExecutableActions.ts";
import pasteSVG from "../resources/pasteSVG.ts";

export type PasteAnyElementConfig = {
    allowExternalImages: boolean
}

export class PasteAnyElement implements ExecutableActions {
    private readonly listener: (ev: KeyboardEvent) => void;
    private config: PasteAnyElementConfig = {
        allowExternalImages: true
    };

    public contextual: ContextualProperties[] = [{
        name: 'Paste',
        order: '1,1',
        svg: pasteSVG,
        shortcut: {
            key: 'v',
            ctrl: true,
            meta: true,
        },
        visibility: () => 'hidden',
        execute: this.execute.bind(this),
    }]

    static build(
        canvas: Canvas,
        config: PasteAnyElementConfig
    ): PasteAnyElement {
        const instance = new PasteAnyElement(canvas);
        instance.config = config;
        return instance;
    }

    constructor(
        private canvas: Canvas
    ) {
        this.listener = this.pasteData.bind(this);
        window.addEventListener("keydown", this.listener);
    }

    private pasteData(ev: KeyboardEvent) {
        if (ev.key === 'v' && ev.ctrlKey || ev.key === 'v' && ev.metaKey) {
            this.execute();
        }
    }

    public execute() {
        navigator.clipboard.read().then((clipboardItems) => {
            for (const item of clipboardItems) {
                if (item.types.includes('text/plain')) {
                    this.pasteText(item);
                }
                if (item.types.includes('image/png')) {
                    if (!this.config.allowExternalImages) continue;
                    this.pasteImage(item);
                }
            }
        });
    }

    private pasteText(item: ClipboardItem) {
        if (item.types.includes('text/plain')) {
            item.getType('text/plain').then((blob) => {
                blob.text().then((text) => {
                    const data = JSON.parse(text);
                    const obj = data.object;
                    new ObjectBuilder(obj, obj.type.toString().toLowerCase())
                        .setUrl(obj.src ?? '')
                        .build<FabricObject>()
                        .then((object) => {
                            object.set({
                                left: object.left + 10,
                                top: object.top + 10
                            });
                            this.canvas.add(object);
                            this.canvas.setActiveObject(object);
                        });

                })
            })
        }
    }

    private pasteImage(item: ClipboardItem) {
        if (item.types.includes('image/png')) {
            item.getType('image/png').then((blob) => {
                blob.arrayBuffer().then((buffer) => {
                    const url = URL.createObjectURL(new Blob([buffer], {type: 'image/png'}));
                    new ObjectBuilder({}, 'image')
                        .setUrl(url)
                        .build<FabricObject>()
                        .then((object) => {
                            this.canvas.add(object);
                            this.canvas.setActiveObject(object);
                        });
                })
            })
        }
    }
}