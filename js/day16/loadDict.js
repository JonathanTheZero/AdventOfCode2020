"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadDict(chunk) {
    const dict = {};
    for (let str of chunk.split("\r\n")) {
        let [key, n] = str.split(":");
        let nums = n.trim().split(" or ").map(el => el.split("-").map(Number));
        dict[key] = nums;
    }
    return dict;
}
exports.default = loadDict;
