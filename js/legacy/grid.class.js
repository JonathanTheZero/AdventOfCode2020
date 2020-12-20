"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _grid;
Object.defineProperty(exports, "__esModule", { value: true });
class Grid {
    constructor(x, y, z) {
        _grid.set(this, void 0);
        if (Array.isArray(x)) {
            __classPrivateFieldSet(this, _grid, new Array(x[0]).fill(null).map(() => new Array(x[1]).fill(null).map(() => new Array(x[2]).fill(null))));
        }
        else {
            __classPrivateFieldSet(this, _grid, new Array(x).fill(null).map(() => new Array(y).fill(null).map(() => new Array(z).fill(null))));
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
        __classPrivateFieldGet(this, _grid)[a][b][c] = val;
    }
    getElement(x, y, z) {
        try {
            return Array.isArray(x) ? __classPrivateFieldGet(this, _grid)[x[0]][x[1]][x[2]] : __classPrivateFieldGet(this, _grid)[x][y][z];
        }
        catch (e) {
            console.log("The following Error occured:", e);
            return null;
        }
    }
    addLayer(pre = false) {
        if (pre) {
            __classPrivateFieldGet(this, _grid).unshift(new Array(__classPrivateFieldGet(this, _grid)[0].length).fill(null).map(() => new Array(__classPrivateFieldGet(this, _grid)[0][0].length).fill(null)));
        }
        else {
            __classPrivateFieldGet(this, _grid).length += 1;
            __classPrivateFieldGet(this, _grid)[__classPrivateFieldGet(this, _grid).length - 1] = new Array(__classPrivateFieldGet(this, _grid)[0].length).fill(null).map(() => new Array(__classPrivateFieldGet(this, _grid)[0][0].length).fill(null));
        }
        console.log(__classPrivateFieldGet(this, _grid));
    }
    getElementsWhere(filter) {
        return __classPrivateFieldGet(this, _grid).flat(2).filter(filter);
    }
    getNeighbours(x, y, z) {
        return [
            __classPrivateFieldGet(this, _grid)[x - 1][y - 1][z - 1],
            __classPrivateFieldGet(this, _grid)[x - 1][y - 1][z],
            __classPrivateFieldGet(this, _grid)[x - 1][y - 1][z + 1],
            __classPrivateFieldGet(this, _grid)[x - 1][y][z - 1],
            __classPrivateFieldGet(this, _grid)[x - 1][y][z],
            __classPrivateFieldGet(this, _grid)[x - 1][y][z + 1],
            __classPrivateFieldGet(this, _grid)[x - 1][y + 1][z - 1],
            __classPrivateFieldGet(this, _grid)[x - 1][y + 1][z],
            __classPrivateFieldGet(this, _grid)[x - 1][y + 1][z + 1],
            __classPrivateFieldGet(this, _grid)[x][y - 1][z - 1],
            __classPrivateFieldGet(this, _grid)[x][y - 1][z],
            __classPrivateFieldGet(this, _grid)[x][y - 1][z + 1],
            __classPrivateFieldGet(this, _grid)[x][y][z - 1],
            __classPrivateFieldGet(this, _grid)[x][y][z],
            __classPrivateFieldGet(this, _grid)[x][y][z + 1],
            __classPrivateFieldGet(this, _grid)[x][y + 1][z - 1],
            __classPrivateFieldGet(this, _grid)[x][y + 1][z],
            __classPrivateFieldGet(this, _grid)[x][y + 1][z + 1],
            __classPrivateFieldGet(this, _grid)[x + 1][y - 1][z - 1],
            __classPrivateFieldGet(this, _grid)[x + 1][y - 1][z],
            __classPrivateFieldGet(this, _grid)[x + 1][y - 1][z + 1],
            __classPrivateFieldGet(this, _grid)[x + 1][y][z - 1],
            __classPrivateFieldGet(this, _grid)[x + 1][y][z],
            __classPrivateFieldGet(this, _grid)[x + 1][y][z + 1],
            __classPrivateFieldGet(this, _grid)[x + 1][y + 1][z - 1],
            __classPrivateFieldGet(this, _grid)[x + 1][y + 1][z],
            __classPrivateFieldGet(this, _grid)[x + 1][y + 1][z + 1],
        ];
    }
    contains(obj) {
        return __classPrivateFieldGet(this, _grid).flat(2).includes(obj);
    }
    get dimensions() {
        return [
            __classPrivateFieldGet(this, _grid).length,
            __classPrivateFieldGet(this, _grid)[0].length,
            __classPrivateFieldGet(this, _grid)[0][0].length
        ];
    }
    get size() {
        return __classPrivateFieldGet(this, _grid).length * __classPrivateFieldGet(this, _grid)[0].length * __classPrivateFieldGet(this, _grid)[0][0].length;
    }
}
exports.default = Grid;
_grid = new WeakMap();
