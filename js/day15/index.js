"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require("../utils/array");
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const values = data.toString().split(",").map(Number);
    const result = new Map();
    values.forEach((el, i) => result.set(el, i + 1));
    let last = 0;
    for (let i = values.length + 1; i <= 30000000; ++i) {
        if (result.has(last)) {
            const curr = result.get(last);
            result.set(last, i);
            last = i - curr;
        }
        else {
            result.set(last, i);
            last = 0;
        }
        if (i === 2019) {
            console.log("Task1:", last);
        }
        else if (i === 30000000 - 1) {
            console.log("Task2:", last);
        }
    }
});
