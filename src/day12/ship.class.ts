import type { coordinates, direction, turnDirection } from "./definitions";
import Waypoint from "./waypoint.class";

export default class Ship {
    private _coordinates: coordinates;
    private _direction: direction;
    private _waypoint: Waypoint; //relative position to the ship

    constructor(coordinates: coordinates = [0, 0], direction: direction = "E") {
        this._coordinates = coordinates;
        this._direction = direction;
        this._waypoint = new Waypoint([1, 10]);
    }

    get coordinates(): coordinates {
        return this._coordinates;
    }

    get waypoint(): Waypoint {
        return this._waypoint;
    }

    get direction(): direction {
        return this._direction;
    }

    set direction(direction: direction) {
        this._direction = direction;
    }

    public move(x: number, y: number): void;
    public move(amount: number): void;
    public move(val: number, direction: direction): void;
    public move(a: number, b?: number | direction) {
        if (typeof b === "number") {
            this._coordinates[0] += a;
            this._coordinates[1] += b;
        } else this.moveBasedOnDirection(a, b);
    }

    private moveBasedOnDirection(a: number, direction = this._direction) {
        if (direction === "N") this.coordinates[0] += a;
        else if (direction === "E") this._coordinates[1] += a;
        else if (direction === "S") this._coordinates[0] -= a;
        else if (direction === "W") this._coordinates[1] -= a;
    }

    public turn(direction: turnDirection, degrees: number) {
        if (direction === "L") {
            for (let i = 0; i < degrees / 90; ++i) {
                if (this.direction === "N") this.direction = "W";
                else if (this.direction === "W") this.direction = "S";
                else if (this.direction === "S") this.direction = "E";
                else if (this.direction === "E") this.direction = "N";
            }
        } else if (direction === "R") {
            for (let i = 0; i < degrees / 90; ++i) {
                if (this.direction === "N") this.direction = "E";
                else if (this.direction === "E") this.direction = "S";
                else if (this.direction === "S") this.direction = "W";
                else if (this.direction === "W") this.direction = "N";
            }
        }
    }

    public moveTowardsWaypoint(value: number) {
        this._coordinates[0] += value * this._waypoint.coordinates[0];
        this._coordinates[1] += value * this._waypoint.coordinates[1];
    }
}