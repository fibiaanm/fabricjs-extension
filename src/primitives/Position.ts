import Decimal from "decimal.js";

export default class Position {
    private _x: Decimal;
    private _y: Decimal;

    constructor(x: number, y: number) {
        this._x = new Decimal(x);
        this._y = new Decimal(y);
    }

    public get x(): number {
        return this._x.toNumber();
    }

    public get y(): number {
        return this._y.toNumber();
    }

    public set x(value: number) {
        this._x = new Decimal(value);
    }

    public set y(value: number) {
        this._y = new Decimal(value);
    }

    static zero(): Position {
        return new Position(0, 0);
    }

    static unitary(): Position {
        return new Position(1, 1);
    }
}