"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function visibleSeats(values, x, y) {
    var _a;
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
            let temp = (_a = values[i]) === null || _a === void 0 ? void 0 : _a[j];
            if (temp !== ".") {
                ret.push(temp);
                break;
            }
        }
    }
    return ret;
}
exports.default = visibleSeats;
