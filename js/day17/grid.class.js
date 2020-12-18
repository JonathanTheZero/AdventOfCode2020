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
            __classPrivateFieldSet(this, _grid, new Array(x[0]));
            for (let i = 0; i < __classPrivateFieldGet(this, _grid).length; ++i) {
                __classPrivateFieldGet(this, _grid)[i] = new Array(x[1]);
                for (let j = 0; j < __classPrivateFieldGet(this, _grid)[i].length; ++i) {
                    __classPrivateFieldGet(this, _grid)[i][j] = new Array(x[2]);
                }
            }
        }
        else {
            __classPrivateFieldSet(this, _grid, new Array(x));
            for (let i = 0; i < __classPrivateFieldGet(this, _grid).length; ++i) {
                __classPrivateFieldGet(this, _grid)[i] = new Array(y);
                for (let j = 0; j < __classPrivateFieldGet(this, _grid)[i].length; ++j) {
                    __classPrivateFieldGet(this, _grid)[i][j] = new Array(z);
                }
            }
        }
    }
    add(x, y, z, obj) {
        if (Array.isArray(x)) {
            __classPrivateFieldGet(this, _grid)[x[0]][x[1]][x[2]] = y;
        }
        else {
            __classPrivateFieldGet(this, _grid)[x][y][z] = obj;
        }
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
