import type { coordinates } from "./definitions";


export default class Grid<T> {
    #grid: T[][][];

    constructor(x: number, y: number, z: number);
    constructor(size: coordinates);
    constructor(x: any, y?: any, z?: any) {
        if (Array.isArray(x)) {
            this.#grid = new Array(x[0]);
            for (let i = 0; i < this.#grid.length; ++i) {
                this.#grid[i] = new Array(x[1]);

                for (let j = 0; j < this.#grid[i].length; ++i) {
                    this.#grid[i][j] = new Array(x[2]);
                }
            }
        } else {
            this.#grid = new Array(x);
            for (let i = 0; i < this.#grid.length; ++i) {
                this.#grid[i] = new Array(y);

                for (let j = 0; j < this.#grid[i].length; ++j) {
                    this.#grid[i][j] = new Array(z);
                }
            }
        }
    }

    public add(x: number, y: number, z: number, obj: T): void;
    public add(c: coordinates, obj: T): void;
    public add(x: any, y?: any, z?: any, obj?: any): void {
        if (Array.isArray(x)) {
            this.#grid[x[0]][x[1]][x[2]] = y;
        } else {
            this.#grid[x][y][z] = obj;
        }
    }

    public contains(obj: T): boolean {
        return this.#grid.flat(2).includes(obj);
    }

    get dimensions(): coordinates {
        return [
            this.#grid.length,
            this.#grid[0].length,
            this.#grid[0][0].length
        ];
    }

    get size(): number {
        return this.#grid.length * this.#grid[0].length * this.#grid[0][0].length;
    }
}