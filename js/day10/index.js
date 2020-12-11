"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const values = data.toString().split("\r\n").map(Number).sort((a, b) => a - b);
    values.unshift(0);
    values.push(values[values.length - 1] + 3);
    let jol1 = 0, jol3 = 0;
    for (let i = 0; i < values.length; ++i) {
        let diff = values[i] - values[i - 1];
        if (diff == 3)
            jol3++;
        if (diff == 1)
            jol1++;
    }
    console.log("Result:", jol1 * jol3);
    const possibleSubs = {};
    for (let val of values) {
        possibleSubs[val] = values.filter(a => a > val && a - val < 4);
    }
    const caluclateWay = (node) => {
        if (!node)
            return 0;
        if (!node.length)
            return 1;
        let result = 0;
        node.forEach(val => result += caluclateWay(possibleSubs[val]));
        return result;
    };
    const subPaths = {}, getSub = (index) => {
        if (possibleSubs[index].length === 0)
            return 1;
        if (subPaths[index])
            return subPaths[index];
        let result = 0;
        possibleSubs[index].forEach(val => {
            result += getSub(val);
        });
        return result;
    };
    for (let i = values.length; i >= 0; --i) {
        if (!possibleSubs[i])
            continue;
        if (possibleSubs[i].length == 0)
            subPaths[i] = 1;
        else {
            subPaths[i] = getSub(i);
        }
    }
    console.log("Result Part2:", subPaths[values[0]]);
});
