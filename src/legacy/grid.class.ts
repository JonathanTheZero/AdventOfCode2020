import type { coordinates } from "../day17/definitions";


export default class Grid<T> {
    private _grid: (T | null)[][][];

    constructor(x: number, y: number, z: number);
    constructor(size: coordinates);
    constructor(x: any, y?: any, z?: any) {
        if (Array.isArray(x)) {
            this._grid = new Array(x[0]).fill(null).map(() => new Array(x[1]).fill(null).map(() => new Array(x[2]).fill(null)));
        } else {
            this._grid = new Array(x).fill(null).map(() => new Array(y).fill(null).map(() => new Array(z).fill(null)));
        }
    }

    public setElement(x: number, y: number, z: number, obj: T): void;
    public setElement(c: coordinates, obj: T): void;
    public setElement(x: any, y?: any, z?: any, obj?: any): void {
        const signature = Array.isArray(x);

        let [a, b, c] = signature ? x : [x, y, z],
            val: T = signature ? y : obj;

        if (a > this.dimensions[0] || b > this.dimensions[1] || c > this.dimensions[2]) {
            throw new Error(
                "Coordinates are outof bound.\n" +
                "Coordinates: " + [a, b, c] + "\n" +
                "Dimensions: " + this.dimensions
            );
        }

        this._grid[a][b][c] = val;
    }

    public getElement(x: number, y: number, z: number): T | null;
    public getElement(c: coordinates): T | null;
    public getElement(x: number | coordinates, y?: number, z?: number) {
        try {
            return Array.isArray(x) ? this._grid[x[0]][x[1]][x[2]] : this._grid[x][y!][z!];
        } catch (e) {
            console.log("The following Error occured:", e);
            return null;
        }
    }

    public addLayer(pre = false): void {
        if (pre) {
            this._grid.unshift(new Array(this._grid[0].length).fill(null).map(() => new Array(this._grid[0][0].length).fill(null)));
        } else {
            this._grid.length += 1;
            this._grid[this._grid.length - 1] = new Array(this._grid[0].length).fill(null).map(() => new Array(this._grid[0][0].length).fill(null));
        }
        console.log(this._grid);
    }

    public getElementsWhere(filter: (value: T | null, index: number, array: (T | null)[]) => value is T | null){
        return this._grid.flat(2).filter(filter);
    }

    public getNeighbours(x: number, y: number, z: number): (null | T)[] {
        return [
            this._grid[x - 1][y - 1][z - 1],
            this._grid[x - 1][y - 1][z],
            this._grid[x - 1][y - 1][z + 1],
            this._grid[x - 1][y][z - 1],
            this._grid[x - 1][y][z],
            this._grid[x - 1][y][z + 1],
            this._grid[x - 1][y + 1][z - 1],
            this._grid[x - 1][y + 1][z],
            this._grid[x - 1][y + 1][z + 1],
            this._grid[x][y - 1][z - 1],
            this._grid[x][y - 1][z],
            this._grid[x][y - 1][z + 1],
            this._grid[x][y][z - 1],
            this._grid[x][y][z],
            this._grid[x][y][z + 1],
            this._grid[x][y + 1][z - 1],
            this._grid[x][y + 1][z],
            this._grid[x][y + 1][z + 1],
            this._grid[x + 1][y - 1][z - 1],
            this._grid[x + 1][y - 1][z],
            this._grid[x + 1][y - 1][z + 1],
            this._grid[x + 1][y][z - 1],
            this._grid[x + 1][y][z],
            this._grid[x + 1][y][z + 1],
            this._grid[x + 1][y + 1][z - 1],
            this._grid[x + 1][y + 1][z],
            this._grid[x + 1][y + 1][z + 1],
        ];
    }

    public contains(obj: T): boolean {
        return this._grid.flat(2).includes(obj);
    }

    get dimensions(): coordinates {
        return [
            this._grid.length,
            this._grid[0].length,
            this._grid[0][0].length
        ];
    }

    get size(): number {
        return this._grid.length * this._grid[0].length * this._grid[0][0].length;
    }
}