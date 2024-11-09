import {Circle, CircleProps, FabricImage, FabricObjectProps, Rect} from "fabric";

type supportedObjects = 'rect' | 'image' | 'circle'

export class ObjectBuilder {

    private url: string = '';
    constructor(
        private props: Partial<FabricObjectProps | CircleProps>,
        private kind: supportedObjects
    ) {
        const mapData = new Map(Object.entries(props));
        mapData.delete('type');
        mapData.delete('version');
        this.props = Object.fromEntries(mapData.entries()) as Partial<FabricObjectProps>;
    }

    public setUrl(url: string) {
        this.url = url;
        return this;
    }

    public build<T>(): Promise<T> {
        switch (this.kind) {
            case "rect":
                return this.buildRect() as Promise<T>;
            case "image":
                return this.buildImage() as Promise<T>;
            case "circle":
                return this.buildCircle() as Promise<T>;
        }
    }

    private buildRect() {
        return new Promise((resolve) => {
            const rect = new Rect(this.props);
            resolve(rect);
        })
    }

    private buildCircle() {
        return new Promise((resolve) => {
            const circle = new Circle(this.props);
            resolve(circle);
        })
    }

    private async buildImage() {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = this.url;
            image.onload = () => {
                const fabricImage = new FabricImage(image, this.props);
                resolve(fabricImage);
            }
        })
    }
}