import { EOL } from "os";
import type { directions, Nullable } from "../utils/utilTypes";

/**
 * implemented as decentralized data structure
 * more or less only for this usecase
 * allows construction without coordinates
 */
export default class Tile {
    top: Nullable<Tile> = null;
    left: Nullable<Tile> = null;
    right: Nullable<Tile> = null;
    bottom: Nullable<Tile> = null;

    changed = false;

    constructor(public id: number, public grid: string[][]) { }

    get lineLength(): number {
        return this.grid[0].length;
    }

    public edge(directions: directions): string {
        switch (directions) {
            case "top":
                return this.grid[0].join("");
            case "bottom":
                return this.grid[this.lineLength - 1].join("");
            case "left":
                return this.grid.map(e => e[0]).join("");
            case "right":
                return this.grid.map(e => e[this.lineLength - 1]).join("");
        }
    }

    get edges() {
        return [
            this.grid[0].join(""),
            this.grid[this.lineLength - 1].join(""),
            this.grid.map(e => e[0]).join(""),
            this.grid.map(e => e[this.lineLength - 1]).join("")
        ] as const;
    }

    get neighbours() {
        return [this.top, this.left, this.right, this.bottom];
    }

    get neighbourLength() {
        return this.neighbours.filter(e => e).length;
    }

    get neighbourIDs() {
        return [this.top?.id, this.left?.id, this.right?.id, this.bottom?.id];
    }

    get gridWithoutEdges(){
        let arr = this.grid.map(e => e);
        arr = arr.slice(1, -1).map(e => e.slice(1, -1));
        return arr;
    }

    /**
     * Rotates the array clockwise
     * @param amount number of turns
     */
    public rotate(): void {
        this.grid = this.grid.map((_, i) => this.grid.map(e => e[i]).reverse());
        this.changed = true;
        for (let n of this.neighbours) {
            if (!n?.changed) n?.rotate();
        }
        [this.top, this.right, this.bottom, this.left] = [this.left, this.top, this.right, this.bottom];
    }

    public mirror() {
        this.grid = this.grid.map(e => e.reverse());
        this.changed = true;
        for (let n of this.neighbours) {
            if (!n?.changed) n?.mirror();
        }
        [this.left, this.right] = [this.right, this.left];
    }

    /**
     * Resets all the markers for the whole grid/graph.
     * This functionality is in a seperate method for 
     * a HUGE performance boost when working with the recursive rotate/mirror
     * functions
     */
    public resetChanges() {
        this.changed = false;
        for (let n of this.neighbours) {
            if (n?.changed) n.resetChanges();
        }
    }

    public toString(): string {
        return this.grid.map(e => e.join("")).join(EOL);
    }
}