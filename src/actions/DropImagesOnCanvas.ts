import {Canvas, FabricImage} from "fabric";
import {ObjectBuilder} from "../pages/objects/ObjectBuilder";

export class DropImagesOnCanvas {

    static build(canvas: Canvas) {
        return new DropImagesOnCanvas(canvas);
    }

    constructor(private canvas: Canvas) {
        console.trace()
        this.initializeDropZone();
    }

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

        console.log('items', items);

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
            left: 0,
            top: 0,
            scaleX: 0.4,
            scaleY: 0.4,
        }, 'image')
            .setUrl(url)
            .build<FabricImage>()
            .then((image) => {
                this.canvas.add(image);
                this.canvas.setActiveObject(image);
                this.canvas.renderAll();
            });
    }
}