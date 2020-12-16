import type { coordinates, direction, turnDirection } from "./definitions";

export default class Waypoint {
    #coordinates: coordinates;

    constructor(coordinates: coordinates) {
        this.#coordinates = coordinates;
    }

    get coordinates(): coordinates {
        return this.#coordinates;
    }

    public move(coordinates: coordinates): void;
    public move(amount: number, direction: direction): void;
    public move(amount: number | coordinates, direction?: direction): void {
        if (typeof amount === "number" && typeof direction === "string") {
            if (direction === "N") this.coordinates[0] += amount;
            else if (direction === "E") this.#coordinates[1] += amount;
            else if (direction === "S") this.#coordinates[0] -= amount;
            else if (direction === "W") this.#coordinates[1] -= amount;
        } else if(Array.isArray(amount)){
            this.#coordinates[0] += amount[0];
            this.#coordinates[1] += amount[1];
        }
    }

    public moveTo(x: number, y: number){
        this.#coordinates[0] = x;
        this.#coordinates[1] = y;
    }

    public turnAround(turnDirection: turnDirection, degrees: number) {
        let [tempX, tempY] = this.#coordinates;
        if (degrees === 180) {
            this.#coordinates[0] = -tempX;
            this.#coordinates[1] = -tempY;
        } else if (degrees === 90 && turnDirection === "L" || degrees === 270 && turnDirection === "R") {
            this.#coordinates[0] = tempY;
            this.#coordinates[1] = -tempX;
        } else if (degrees === 90 && turnDirection === "R" || degrees === 270 && turnDirection === "L") {
            this.#coordinates[0] = -tempY;
            this.#coordinates[1] = tempX;
        }
    }
}