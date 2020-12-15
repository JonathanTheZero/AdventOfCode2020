"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const CRT_1 = require("./CRT");
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    let values = data.toString().split("\r\n");
    let timestamp = Number(values[0]), buslines = values[1].split(",").filter(el => el !== "x").map(Number);
    const results = [];
    for (let line of buslines) {
        for (let i = 1; true; i++) {
            if (line * i > timestamp) {
                results.push({ line, time: line * i });
                break;
            }
        }
    }
    const final = results.reduce((prev, curr) => prev.time < curr.time ? prev : curr);
    console.log("Task1:", (final.time - timestamp) * final.line);
    let busList = values[1].split(",").map(e => Number(e) || "x");
    console.log("Task2:", CRT_1.chineseRemainderTheorem(busList));
});
