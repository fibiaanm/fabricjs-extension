import {Canvas, FabricImage} from "fabric";
import {ObjectBuilder} from "../pages/objects/ObjectBuilder";
import {virtualizeToFabricCoords} from "../utils/virtualizeToFabricCoords.ts";
import Position from "../primitives/Position.ts";
import {extensionCustomWindowEvents} from "./list.ts";

export type DropImagesOnCanvasConfig = {
    justCreateObject?: boolean
}

export class DropImagesOnCanvas {

    config: DropImagesOnCanvasConfig = {};

    static build(
        canvas: Canvas,
        config: DropImagesOnCanvasConfig
    ): DropImagesOnCanvas {
        const instance = new DropImagesOnCanvas(canvas);
        instance.config = config;
        return instance;
    }

    constructor(private canvas: Canvas) {
        this.initializeDropZone();
    }

    private vPosition: Position = new Position(0,0);

    private initializeDropZone() {
        const canvasEl = this.canvas.getElement();
        const wrapper = canvasEl.parentElement!;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            wrapper.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Add visual feedback
        ['dragenter', 'dragover'].forEach(eventName => {
            wrapper.addEventListener(eventName, () => {
                wrapper.classList.add('border-2', 'border-dashed', 'border-white');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            wrapper.addEventListener(eventName, () => {
                wrapper.classList.remove('border-2', 'border-dashed', 'border-white');
            });
        });


        // Handle drop
        wrapper.addEventListener('drop', (e) => this.handleDrop(e));
    }

    private handleDrop(e: DragEvent) {
        const files = e.dataTransfer?.files;
        const items = e.dataTransfer?.items;

        // Handle dropped files (local images)
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    this.addImageFromFile(file);
                }
            });
            return; // Exit early if we handled files
        }

        const evCoords = new Position(
            e.clientX,
            e.clientY
        );
        this.vPosition = virtualizeToFabricCoords(evCoords, this.canvas);

        // Only handle items if we didn't handle files
        if (items && items.length > 0) {
            // Try to find an HTML image first
            const htmlItem = Array.from(items).find(item => item.type === 'text/html');
            if (htmlItem) {
                htmlItem.getAsString((html) => {
                    const imgMatch = html.match(/<img.*?src="(.*?)"/)
                    if (imgMatch && imgMatch[1]) {
                        this.addImageFromUrl(imgMatch[1]);
                    }
                });
                return; // Exit after handling HTML image
            }

            // If no HTML image, look for other image types
            const imageItem = Array.from(items).find(item => item.type.startsWith('image/'));
            if (imageItem) {
                const file = imageItem.getAsFile();
                if (file) {
                    this.addImageFromFile(file);
                }
            }
        }
    }

    private addImageFromFile(file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const url = e.target?.result as string;
            this.addImageFromUrl(url);
        };
        reader.readAsDataURL(file);
    }

    private addImageFromUrl(url: string) {
        new ObjectBuilder({
            left: this.vPosition.x,
            top: this.vPosition.y,
            scaleX: 0.4,
            scaleY: 0.4,
        }, 'image')
            .setUrl(url)
            .build<FabricImage>()
            .then((image) => {
                const halfWidth = image.width * image.scaleX / 2;
                const halfHeight = image.height * image.scaleY / 2;
                image.set({
                    left: this.vPosition.x - halfWidth,
                    top: this.vPosition.y - halfHeight,
                });

                if (this.config.justCreateObject) {
                    const imageDroppedEvent = new CustomEvent(extensionCustomWindowEvents.imageDropped, {
                        detail: {
                            image
                        }
                    });
                    window.dispatchEvent(imageDroppedEvent);
                    return;
                }

                this.canvas.add(image);
                this.canvas.setActiveObject(image);
                this.canvas.renderAll();
            });
    }
}