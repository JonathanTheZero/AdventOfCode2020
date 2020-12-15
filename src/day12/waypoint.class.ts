import type { coordinates, direction, turnDirection } from "./definitions";

export default class Waypoint {
    private _coordinates: coordinates;

    constructor(coordinates: coordinates) {
        this._coordinates = coordinates;
    }

    get coordinates(): coordinates {
        return this._coordinates;
    }

    public move(coordinates: coordinates): void;
    public move(amount: number, direction: direction): void;
    public move(amount: number | coordinates, direction?: direction): void {
        if (typeof amount === "number" && typeof direction === "string") {
            if (direction === "N") this.coordinates[0] += amount;
            else if (direction === "E") this._coordinates[1] += amount;
            else if (direction === "S") this._coordinates[0] -= amount;
            else if (direction === "W") this._coordinates[1] -= amount;
        } else if(Array.isArray(amount)){
            this._coordinates[0] += amount[0];
            this._coordinates[1] += amount[1];
        }
    }

    public moveTo(x: number, y: number){
        this._coordinates[0] = x;
        this._coordinates[1] = y;
    }

    public turnAround(turnDirection: turnDirection, degrees: number) {
        let [tempX, tempY] = this._coordinates;
        if (degrees === 180) {
            this._coordinates[0] = -tempX;
            this._coordinates[1] = -tempY;
        } else if (degrees === 90 && turnDirection === "L" || degrees === 270 && turnDirection === "R") {
            this._coordinates[0] = tempY;
            this._coordinates[1] = -tempX;
        } else if (degrees === 90 && turnDirection === "R" || degrees === 270 && turnDirection === "L") {
            this._coordinates[0] = -tempY;
            this._coordinates[1] = tempX;
        }
    }
}