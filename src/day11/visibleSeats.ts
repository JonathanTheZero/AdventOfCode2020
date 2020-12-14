import type { adjacents, seat } from "./definitions";

export default function visibleSeats(values: seat[][], x: number, y: number): adjacents {
    let ret: adjacents = [];
    
    const deltas = [
        [-1, -1],
        [-1, +0],
        [-1, +1],
        [+0, -1],
        [+0, +1],
        [+1, -1],
        [+1, +0],
        [+1, +1]
    ] as const;

    for (let [dx, dy] of deltas) {
        let factor = 1, i, j;
        while (true) {
            i = x + dx * factor;
            j = y + dy * factor++;
            let temp: seat | undefined = values[i]?.[j];

            if (temp !== ".") {
                ret.push(temp);
                break;
            }
        }
    }

    return ret;
}