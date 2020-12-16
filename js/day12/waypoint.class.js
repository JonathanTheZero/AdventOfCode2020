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
var _coordinates;
Object.defineProperty(exports, "__esModule", { value: true });
class Waypoint {
    constructor(coordinates) {
        _coordinates.set(this, void 0);
        __classPrivateFieldSet(this, _coordinates, coordinates);
    }
    get coordinates() {
        return __classPrivateFieldGet(this, _coordinates);
    }
    move(amount, direction) {
        if (typeof amount === "number" && typeof direction === "string") {
            if (direction === "N")
                this.coordinates[0] += amount;
            else if (direction === "E")
                __classPrivateFieldGet(this, _coordinates)[1] += amount;
            else if (direction === "S")
                __classPrivateFieldGet(this, _coordinates)[0] -= amount;
            else if (direction === "W")
                __classPrivateFieldGet(this, _coordinates)[1] -= amount;
        }
        else if (Array.isArray(amount)) {
            __classPrivateFieldGet(this, _coordinates)[0] += amount[0];
            __classPrivateFieldGet(this, _coordinates)[1] += amount[1];
        }
    }
    moveTo(x, y) {
        __classPrivateFieldGet(this, _coordinates)[0] = x;
        __classPrivateFieldGet(this, _coordinates)[1] = y;
    }
    turnAround(turnDirection, degrees) {
        let [tempX, tempY] = __classPrivateFieldGet(this, _coordinates);
        if (degrees === 180) {
            __classPrivateFieldGet(this, _coordinates)[0] = -tempX;
            __classPrivateFieldGet(this, _coordinates)[1] = -tempY;
        }
        else if (degrees === 90 && turnDirection === "L" || degrees === 270 && turnDirection === "R") {
            __classPrivateFieldGet(this, _coordinates)[0] = tempY;
            __classPrivateFieldGet(this, _coordinates)[1] = -tempX;
        }
        else if (degrees === 90 && turnDirection === "R" || degrees === 270 && turnDirection === "L") {
            __classPrivateFieldGet(this, _coordinates)[0] = -tempY;
            __classPrivateFieldGet(this, _coordinates)[1] = tempX;
        }
    }
}
exports.default = Waypoint;
_coordinates = new WeakMap();
