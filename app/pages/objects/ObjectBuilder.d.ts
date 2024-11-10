import { CircleProps, FabricObjectProps } from 'fabric';

type supportedObjects = 'rect' | 'image' | 'circle';
export declare class ObjectBuilder {
    private props;
    private kind;
    private url;
    constructor(props: Partial<FabricObjectProps | CircleProps>, kind: supportedObjects);
    setUrl(url: string): this;
    build<T>(): Promise<T>;
    private buildRect;
    private buildCircle;
    private buildImage;
}
export {};
//# sourceMappingURL=ObjectBuilder.d.ts.map