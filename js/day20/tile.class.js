"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
class Tile {
    constructor(id, grid) {
        this.id = id;
        this.grid = grid;
        this.top = null;
        this.left = null;
        this.right = null;
        this.bottom = null;
        this.changed = false;
    }
    get lineLength() {
        return this.grid[0].length;
    }
    edge(directions) {
        switch (directions) {
            case "top":
                return this.grid[0].join("");
            case "bottom":
                return this.grid[this.lineLength - 1].join("");
            case "left":
                return this.grid.map(e => e[0]).join("");
            case "right":
                return this.grid.map(e => e[this.lineLength - 1]).join("");
        }
    }
    get edges() {
        return [
            this.grid[0].join(""),
            this.grid[this.lineLength - 1].join(""),
            this.grid.map(e => e[0]).join(""),
            this.grid.map(e => e[this.lineLength - 1]).join("")
        ];
    }
    get neighbours() {
        return [this.top, this.left, this.right, this.bottom];
    }
    get neighbourLength() {
        return this.neighbours.filter(e => e).length;
    }
    get neighbourIDs() {
        var _a, _b, _c, _d;
        return [(_a = this.top) === null || _a === void 0 ? void 0 : _a.id, (_b = this.left) === null || _b === void 0 ? void 0 : _b.id, (_c = this.right) === null || _c === void 0 ? void 0 : _c.id, (_d = this.bottom) === null || _d === void 0 ? void 0 : _d.id];
    }
    rotate() {
        this.grid = this.grid.map((_, i) => this.grid.map(e => e[i]).reverse());
        this.changed = true;
        for (let n of this.neighbours) {
            if (!(n === null || n === void 0 ? void 0 : n.changed))
                n === null || n === void 0 ? void 0 : n.rotate();
        }
        [this.top, this.right, this.bottom, this.left] = [this.left, this.top, this.right, this.bottom];
    }
    mirror() {
        this.grid = this.grid.map(e => e.reverse());
        this.changed = true;
        for (let n of this.neighbours) {
            if (!(n === null || n === void 0 ? void 0 : n.changed))
                n === null || n === void 0 ? void 0 : n.mirror();
        }
        [this.left, this.right] = [this.right, this.left];
    }
    resetChanges() {
        this.changed = false;
        for (let n of this.neighbours) {
            if (n === null || n === void 0 ? void 0 : n.changed)
                n.resetChanges();
        }
    }
    toString() {
        return this.grid.map(e => e.join("")).join(os_1.EOL);
    }
}
exports.default = Tile;
