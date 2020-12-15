"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Waypoint {
    constructor(coordinates) {
        this._coordinates = coordinates;
    }
    get coordinates() {
        return this._coordinates;
    }
    move(amount, direction) {
        if (typeof amount === "number" && typeof direction === "string") {
            if (direction === "N")
                this.coordinates[0] += amount;
            else if (direction === "E")
                this._coordinates[1] += amount;
            else if (direction === "S")
                this._coordinates[0] -= amount;
            else if (direction === "W")
                this._coordinates[1] -= amount;
        }
        else if (Array.isArray(amount)) {
            this._coordinates[0] += amount[0];
            this._coordinates[1] += amount[1];
        }
    }
    moveTo(x, y) {
        this._coordinates[0] = x;
        this._coordinates[1] = y;
    }
    turnAround(turnDirection, degrees) {
        let [tempX, tempY] = this._coordinates;
        if (degrees === 180) {
            this._coordinates[0] = -tempX;
            this._coordinates[1] = -tempY;
        }
        else if (degrees === 90 && turnDirection === "L" || degrees === 270 && turnDirection === "R") {
            this._coordinates[0] = tempY;
            this._coordinates[1] = -tempX;
        }
        else if (degrees === 90 && turnDirection === "R" || degrees === 270 && turnDirection === "L") {
            this._coordinates[0] = -tempY;
            this._coordinates[1] = tempX;
        }
    }
}
exports.default = Waypoint;
