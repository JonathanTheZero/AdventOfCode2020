"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waypoint_class_1 = __importDefault(require("./waypoint.class"));
class Ship {
    constructor(coordinates = [0, 0], direction = "E") {
        this._coordinates = coordinates;
        this._direction = direction;
        this._waypoint = new waypoint_class_1.default([1, 10]);
    }
    get coordinates() {
        return this._coordinates;
    }
    get waypoint() {
        return this._waypoint;
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        this._direction = direction;
    }
    move(a, b) {
        if (typeof b === "number") {
            this._coordinates[0] += a;
            this._coordinates[1] += b;
        }
        else
            this.moveBasedOnDirection(a, b);
    }
    moveBasedOnDirection(a, direction = this._direction) {
        if (direction === "N")
            this.coordinates[0] += a;
        else if (direction === "E")
            this._coordinates[1] += a;
        else if (direction === "S")
            this._coordinates[0] -= a;
        else if (direction === "W")
            this._coordinates[1] -= a;
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
        this._coordinates[0] += value * this._waypoint.coordinates[0];
        this._coordinates[1] += value * this._waypoint.coordinates[1];
    }
}
exports.default = Ship;
