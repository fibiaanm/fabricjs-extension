import Decimal from "decimal.js";

export default class Size {

    private _width: Decimal;
    private _height: Decimal;

    constructor(width: number, height: number) {
        this._width = new Decimal(width);
        this._height = new Decimal(height);
    }

    public get width(): number {
        return this._width.toNumber();
    }

    public get height(): number {
        return this._height.toNumber();
    }

    public set width(value: number) {
        this._width = new Decimal(value);
    }

    public set height(value: number) {
        this._height = new Decimal(value);
    }

    public area(): number {
        return this._width.mul(this._height).toNumber();
    }

    public aspectRatio(): number {
        return this._width.div(this._height).toNumber();
    }
}