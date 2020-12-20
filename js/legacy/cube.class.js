"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cube {
    constructor(isActive = false) {
        this._isActive = isActive;
    }
    toggleActive() {
        this._isActive = this._isActive ? false : true;
    }
}
exports.default = Cube;
