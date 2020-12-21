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
var _dimensions, _grid, _originalGrid, _defaultVal, _neighbourCache;
Object.defineProperty(exports, "__esModule", { value: true });
class NDimensionalGrid {
    constructor(dimensions, originalGrid, defaultVal = ".") {
        _dimensions.set(this, void 0);
        _grid.set(this, {});
        _originalGrid.set(this, void 0);
        _defaultVal.set(this, void 0);
        _neighbourCache.set(this, {});
        __classPrivateFieldSet(this, _dimensions, dimensions);
        originalGrid.flat();
        __classPrivateFieldSet(this, _originalGrid, JSON.stringify(originalGrid));
        __classPrivateFieldSet(this, _defaultVal, defaultVal);
        __classPrivateFieldSet(this, _grid, this.parseArray(JSON.parse(__classPrivateFieldGet(this, _originalGrid))));
    }
    parseArray(array, coord = [], grid = {}) {
        for (let d = 0; d < array.length; d++) {
            let dim = array[d];
            coord.unshift(d);
            if (Array.isArray(dim)) {
                this.parseArray(dim, coord, grid);
            }
            else {
                grid[coord.join(',')] = dim;
            }
            coord.shift();
        }
        return grid;
    }
    getNeighbourCoordinates(coordinates) {
        const coord_str = coordinates.join(',');
        if (!__classPrivateFieldGet(this, _neighbourCache)[coord_str]) {
            __classPrivateFieldGet(this, _neighbourCache)[coord_str] = this.caclcNeighCoordinates(coordinates);
        }
        return __classPrivateFieldGet(this, _neighbourCache)[coord_str];
    }
    caclcNeighCoordinates(coordinates, depth = 1, vector = [], neighbours = []) {
        for (let v of [1, -1, 0]) {
            vector.push(v);
            if (depth === __classPrivateFieldGet(this, _dimensions)) {
                let point = coordinates.map((p, i) => p + vector[i]).join(',');
                if (point !== coordinates.join(',')) {
                    neighbours.push(point);
                }
            }
            else {
                this.caclcNeighCoordinates(coordinates, depth + 1, vector, neighbours);
            }
            vector.pop();
        }
        return neighbours;
    }
    getNeighbors(c, removeUndefined = false) {
        let coordinates = c.split(',').map(Number), neighbours = this.getNeighbourCoordinates(coordinates);
        if (removeUndefined) {
            neighbours = neighbours.filter(v => __classPrivateFieldGet(this, _grid)[v] !== undefined);
        }
        return neighbours;
    }
    getValues(coords, totals = ["#", "."]) {
        let counts = totals.reduce((obj, v) => ((obj[v] = 0), obj), {});
        for (let coord of coords) {
            let type = __classPrivateFieldGet(this, _grid)[coord] || __classPrivateFieldGet(this, _defaultVal);
            counts[type] += 1;
        }
        return counts;
    }
    get activeCubes() {
        return this.getValues(Object.keys(__classPrivateFieldGet(this, _grid)))["#"];
    }
    saveUndefinedCoords(coords, map, defaultValue = __classPrivateFieldGet(this, _defaultVal)) {
        for (let coord of coords) {
            if (__classPrivateFieldGet(this, _grid)[coord] === undefined) {
                map[coord] = defaultValue;
            }
        }
    }
    tick() {
        let extraNeighs = {}, newGrid = {}, coords = Object.entries(__classPrivateFieldGet(this, _grid));
        for (let [coord, value] of coords) {
            let neighbors = this.getNeighbors(coord);
            let neighbor_values = this.getValues(neighbors);
            this.saveUndefinedCoords(neighbors, extraNeighs);
            if (value === "#") {
                if (neighbor_values["#"] === 2 || neighbor_values["#"] === 3) {
                    newGrid[coord] = "#";
                }
                else {
                    newGrid[coord] = ".";
                }
            }
            else if (value === ".") {
                if (neighbor_values["#"] === 3) {
                    newGrid[coord] = "#";
                }
                else {
                    newGrid[coord] = ".";
                }
            }
        }
        for (let [coord, value] of Object.entries(extraNeighs)) {
            let neighbors = this.getNeighbors(coord);
            let neighbor_values = this.getValues(neighbors);
            if (value === ".") {
                if (neighbor_values["#"] === 3)
                    newGrid[coord] = "#";
            }
            else if (value === "#") {
                throw 'Something went wrong!';
            }
        }
        __classPrivateFieldSet(this, _grid, newGrid);
        return this;
    }
    run(steps = 1) {
        for (let i = 0; i < steps; ++i) {
            this.tick();
        }
    }
}
exports.default = NDimensionalGrid;
_dimensions = new WeakMap(), _grid = new WeakMap(), _originalGrid = new WeakMap(), _defaultVal = new WeakMap(), _neighbourCache = new WeakMap();
