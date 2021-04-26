"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Grid {
    constructor(x, y, z) {
        if (Array.isArray(x)) {
            this._grid = new Array(x[0]).fill(null).map(() => new Array(x[1]).fill(null).map(() => new Array(x[2]).fill(null)));
        }
        else {
            this._grid = new Array(x).fill(null).map(() => new Array(y).fill(null).map(() => new Array(z).fill(null)));
        }
    }
    setElement(x, y, z, obj) {
        const signature = Array.isArray(x);
        let [a, b, c] = signature ? x : [x, y, z], val = signature ? y : obj;
        if (a > this.dimensions[0] || b > this.dimensions[1] || c > this.dimensions[2]) {
            throw new Error("Coordinates are outof bound.\n" +
                "Coordinates: " + [a, b, c] + "\n" +
                "Dimensions: " + this.dimensions);
        }
        this._grid[a][b][c] = val;
    }
    getElement(x, y, z) {
        try {
            return Array.isArray(x) ? this._grid[x[0]][x[1]][x[2]] : this._grid[x][y][z];
        }
        catch (e) {
            console.log("The following Error occured:", e);
            return null;
        }
    }
    addLayer(pre = false) {
        if (pre) {
            this._grid.unshift(new Array(this._grid[0].length).fill(null).map(() => new Array(this._grid[0][0].length).fill(null)));
        }
        else {
            this._grid.length += 1;
            this._grid[this._grid.length - 1] = new Array(this._grid[0].length).fill(null).map(() => new Array(this._grid[0][0].length).fill(null));
        }
        console.log(this._grid);
    }
    getElementsWhere(filter) {
        return this._grid.flat(2).filter(filter);
    }
    getNeighbours(x, y, z) {
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
    contains(obj) {
        return this._grid.flat(2).includes(obj);
    }
    get dimensions() {
        return [
            this._grid.length,
            this._grid[0].length,
            this._grid[0][0].length
        ];
    }
    get size() {
        return this._grid.length * this._grid[0].length * this._grid[0][0].length;
    }
}
exports.default = Grid;
