import type { coordinates, direction, turnDirection } from "./definitions";
import Waypoint from "./waypoint.class";

export default class Ship {
    #coordinates: coordinates;
    #direction: direction;
    #waypoint: Waypoint; //relative position to the ship

    constructor(coordinates: coordinates = [0, 0], direction: direction = "E") {
        this.#coordinates = coordinates;
        this.#direction = direction;
        this.#waypoint = new Waypoint([1, 10]);
    }

    get coordinates(): coordinates {
        return this.#coordinates;
    }

    get waypoint(): Waypoint {
        return this.#waypoint;
    }

    get direction(): direction {
        return this.#direction;
    }

    set direction(direction: direction) {
        this.#direction = direction;
    }

    public move(x: number, y: number): void;
    public move(amount: number): void;
    public move(val: number, direction: direction): void;
    public move(a: number, b?: number | direction) {
        if (typeof b === "number") {
            this.#coordinates[0] += a;
            this.#coordinates[1] += b;
        } else this.moveBasedOnDirection(a, b);
    }

    private moveBasedOnDirection(a: number, direction = this.#direction) {
        if (direction === "N") this.coordinates[0] += a;
        else if (direction === "E") this.#coordinates[1] += a;
        else if (direction === "S") this.#coordinates[0] -= a;
        else if (direction === "W") this.#coordinates[1] -= a;
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
        this.#coordinates[0] += value * this.#waypoint.coordinates[0];
        this.#coordinates[1] += value * this.#waypoint.coordinates[1];
    }
}