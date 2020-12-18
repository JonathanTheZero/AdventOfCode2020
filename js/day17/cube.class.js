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
var _isActive;
Object.defineProperty(exports, "__esModule", { value: true });
class Cube {
    constructor(isActive = false) {
        _isActive.set(this, void 0);
        __classPrivateFieldSet(this, _isActive, isActive);
    }
    toggleActive() {
        __classPrivateFieldSet(this, _isActive, __classPrivateFieldGet(this, _isActive) ? false : true);
    }
}
exports.default = Cube;
_isActive = new WeakMap();
