import type { adjacents, seat } from "./definitions";

export default function visibleSeats(values: seat[][], x: number, y: number): adjacents {
    /*const tokens = [
        [x - 1, y - 1],
        [x - 1, y + 0],
        [x - 1, y + 1],
        [x + 0, y - 1],
        [x + 0, y + 1],
        [x + 1, y - 1],
        [x + 1, y + 0],
        [x + 1, y + 1]
    ] as const;

    let ret: adjacents = [
        values[tokens[0][0]]?.[tokens[0][1]] as seat,
        values[tokens[1][0]]?.[tokens[1][1]] as seat,
        values[tokens[2][0]]?.[tokens[2][1]] as seat,
        values[tokens[3][0]]?.[tokens[3][1]] as seat,
        values[tokens[4][0]]?.[tokens[4][1]] as seat,
        values[tokens[5][0]]?.[tokens[5][1]] as seat,
        values[tokens[6][0]]?.[tokens[6][1]] as seat,
        values[tokens[7][0]]?.[tokens[7][1]] as seat,
    ];*/
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