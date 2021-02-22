import { EOL } from "os";
import type { directions } from "../utils/utilTypes";


export default class Tile {
    top: Tile | null = null;
    left: Tile | null = null;
    right: Tile | null = null;
    bottom: Tile | null = null;

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

    get neighbourIDs() {
        return [this.top?.id, this.left?.id, this.right?.id, this.bottom?.id];
    }

    /**
     * Rotates the array clockwise
     * @param amount number of turns
     */
    public rotate(amount: 1 | 2 | 3 = 1): void {
        for (let i = 0; i < amount; ++i) {
            this.grid = this.grid.map((_, i) => this.grid.map(e => e[i]).reverse())
        }
    }

    public mirror() {
        this.grid = this.grid.map(e => e.reverse());
    }

    public toString(): string {
        return this.grid.map(e => e.join("")).join(EOL);
    }
}