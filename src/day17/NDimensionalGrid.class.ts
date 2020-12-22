//Mainly inspired through this Code I found on Reddit: https://github.com/romellem/advent-of-code/blob/eae86d488821293d918696ce4e008e5c5816aacb/2020/17/InfiniteNDimensionalGrid.js
//(means I "copied" it and rewrote it to TypeScript, my own version sadly only worked with 3 dimensions and can be found under ../legacy/grid.class.ts)
import type { NestedArray, nums } from "../utils/utilTypes";
import type { gridType } from "./definitions";
import { States } from "./definitions";


export default class NDimensionalGrid<D extends nums> {
    #dimensions: D;
    #grid: gridType<string> = {};
    #originalGrid: string; //saving as string to save by value and not by reference
    #defaultVal: States;
    #neighbourCache: gridType<string[]> = {};

    constructor(dimensions: D, originalGrid: NestedArray<string, D>, defaultVal = States.Inactive) {
        this.#dimensions = dimensions;
        originalGrid.flat()
        this.#originalGrid = JSON.stringify(originalGrid);
        this.#defaultVal = defaultVal;

        this.#grid = this.parseArray(JSON.parse(this.#originalGrid));
    }

    private parseArray(array: string[][] | string[], coord: number[] = [], grid: gridType<string> = {}) {
        for (let d = 0; d < array.length; d++) {
            let dim = array[d];
            coord.unshift(d);
            if (Array.isArray(dim)) {
                this.parseArray(dim, coord, grid);
            } else {
                grid[coord.join(',')] = dim;
            }
            coord.shift();
        }
        return grid;
    }

    getNeighbourCoordinates(coordinates: number[]) {
        const coord_str = coordinates.join(',');
        if (!this.#neighbourCache[coord_str]) {
            this.#neighbourCache[coord_str] = this.caclcNeighCoordinates(coordinates);
        }

        return this.#neighbourCache[coord_str];
    }

    private caclcNeighCoordinates(coordinates: number[], depth = 1, vector: number[] = [], neighbours: string[] = []): string[] {
        for (let v of [1, -1, 0]) {
            vector.push(v);
            if (depth === this.#dimensions) {
                let point = coordinates.map((p, i) => p + vector[i]).join(',');
                if (point !== coordinates.join(',')) {
                    neighbours.push(point);
                }
            } else {
                this.caclcNeighCoordinates(coordinates, depth + 1, vector, neighbours);
            }
            vector.pop();
        }

        return neighbours;
    }

    private getNeighbors(c: string, removeUndefined = false) {
        let coordinates = c.split(',').map(Number),
            neighbours = this.getNeighbourCoordinates(coordinates);
        if (removeUndefined) {
            neighbours = neighbours.filter(v => this.#grid[v] !== undefined);
        }
        return neighbours;
    }

    public getValues(coords: string[], totals = [States.Active, States.Inactive]) {
        let counts: gridType<number> = totals.reduce((obj, v) => ((obj[v] = 0), obj), {} as gridType<number>);
        for (let coord of coords) {
            let type = this.#grid[coord] || this.#defaultVal;
            counts[type] += 1;
        }

        return counts;
    }

    get activeCubes(){
        return this.getValues(Object.keys(this.#grid))[States.Active];
    }

    private saveUndefinedCoords(coords: string[], map: gridType<string>, defaultValue = this.#defaultVal) {
        for (let coord of coords) {
            if (this.#grid[coord] === undefined) {
                map[coord] = defaultValue;
            }
        }
    }

    private tick() {
        let extraNeighs: gridType<string> = {},
            newGrid: gridType<string> = {},
            coords = Object.entries(this.#grid);
        for (let [coord, value] of coords) {
            let neighbors = this.getNeighbors(coord);
            let neighbor_values = this.getValues(neighbors);

            this.saveUndefinedCoords(neighbors, extraNeighs);

            if (value === States.Active) {
                if (neighbor_values[States.Active] === 2 || neighbor_values[States.Active] === 3) {
                    newGrid[coord] = States.Active;
                } else {
                    newGrid[coord] = States.Inactive;
                }
            } else if (value === States.Inactive) {
                if (neighbor_values[States.Active] === 3) {
                    newGrid[coord] = States.Active;
                } else {
                    newGrid[coord] = States.Inactive;
                }
            }
        }

        // Not the most DRY, but not worth abstracting out
        for (let [coord, value] of Object.entries(extraNeighs)) {
            let neighbors = this.getNeighbors(coord);
            let neighbor_values = this.getValues(neighbors);

            if (value === States.Inactive) {
                if (neighbor_values[States.Active] === 3)
                    newGrid[coord] = States.Active;

            } else if (value === States.Active) {
                throw 'Something went wrong!';
            }
        }

        this.#grid = newGrid;
        return this;
    }

    public run(steps = 1) {
        for (let i = 0; i < steps; ++i) {
            this.tick();
        }
    }
}