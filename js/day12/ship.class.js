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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _coordinates, _direction, _waypoint;
Object.defineProperty(exports, "__esModule", { value: true });
const waypoint_class_1 = __importDefault(require("./waypoint.class"));
class Ship {
    constructor(coordinates = [0, 0], direction = "E") {
        _coordinates.set(this, void 0);
        _direction.set(this, void 0);
        _waypoint.set(this, void 0);
        __classPrivateFieldSet(this, _coordinates, coordinates);
        __classPrivateFieldSet(this, _direction, direction);
        __classPrivateFieldSet(this, _waypoint, new waypoint_class_1.default([1, 10]));
    }
    get coordinates() {
        return __classPrivateFieldGet(this, _coordinates);
    }
    get waypoint() {
        return __classPrivateFieldGet(this, _waypoint);
    }
    get direction() {
        return __classPrivateFieldGet(this, _direction);
    }
    set direction(direction) {
        __classPrivateFieldSet(this, _direction, direction);
    }
    move(a, b) {
        if (typeof b === "number") {
            __classPrivateFieldGet(this, _coordinates)[0] += a;
            __classPrivateFieldGet(this, _coordinates)[1] += b;
        }
        else
            this.moveBasedOnDirection(a, b);
    }
    moveBasedOnDirection(a, direction = __classPrivateFieldGet(this, _direction)) {
        if (direction === "N")
            this.coordinates[0] += a;
        else if (direction === "E")
            __classPrivateFieldGet(this, _coordinates)[1] += a;
        else if (direction === "S")
            __classPrivateFieldGet(this, _coordinates)[0] -= a;
        else if (direction === "W")
            __classPrivateFieldGet(this, _coordinates)[1] -= a;
    }
    turn(direction, degrees) {
        if (direction === "L") {
            for (let i = 0; i < degrees / 90; ++i) {
                if (this.direction === "N")
                    this.direction = "W";
                else if (this.direction === "W")
                    this.direction = "S";
                else if (this.direction === "S")
                    this.direction = "E";
                else if (this.direction === "E")
                    this.direction = "N";
            }
        }
        else if (direction === "R") {
            for (let i = 0; i < degrees / 90; ++i) {
                if (this.direction === "N")
                    this.direction = "E";
                else if (this.direction === "E")
                    this.direction = "S";
                else if (this.direction === "S")
                    this.direction = "W";
                else if (this.direction === "W")
                    this.direction = "N";
            }
        }
    }
    moveTowardsWaypoint(value) {
        __classPrivateFieldGet(this, _coordinates)[0] += value * __classPrivateFieldGet(this, _waypoint).coordinates[0];
        __classPrivateFieldGet(this, _coordinates)[1] += value * __classPrivateFieldGet(this, _waypoint).coordinates[1];
    }
}
exports.default = Ship;
_coordinates = new WeakMap(), _direction = new WeakMap(), _waypoint = new WeakMap();
