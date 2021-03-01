"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gridMatchMonster(gridStr, monster) {
    let gridArr = gridStr.split("\n").map(e => e.split("")), monsterCharAmount = monster.toString().amountOf("#"), ret = [];
    for (let _ = 0; _ < 2; _++) {
        for (let i = 0; i < 4; ++i) {
            let matchingAmount = gridStr.match(monster.regEx);
            console.log(matchingAmount === null || matchingAmount === void 0 ? void 0 : matchingAmount.length);
            if (matchingAmount)
                ret.push(gridStr.amountOf("#") - (matchingAmount.length * monsterCharAmount));
            gridArr = gridArr.map((_, i) => gridArr.map(e => e[i]).reverse());
            gridStr = gridArr.map(e => e.join("")).join("\n");
        }
        gridArr = gridArr.map(e => e.reverse());
        gridStr = gridArr.map(e => e.join("")).join("\n");
    }
    return ret;
}
exports.default = gridMatchMonster;
