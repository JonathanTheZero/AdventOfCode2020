"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function visibleSeats(values, x, y) {
    let ret = [];
    const deltas = [
        [-1, -1],
        [-1, +0],
        [-1, +1],
        [+0, -1],
        [+0, +1],
        [+1, -1],
        [+1, +0],
        [+1, +1]
    ];
    for (let [dx, dy] of deltas) {
        let factor = 1, i, j;
        while (true) {
            i = x + dx * factor;
            j = y + dy * factor++;
            let temp = values[i]?.[j];
            if (temp !== ".") {
                ret.push(temp);
                break;
            }
        }
    }
    return ret;
}
exports.default = visibleSeats;
