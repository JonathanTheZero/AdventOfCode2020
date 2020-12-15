"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require("../utils/array");
require("../utils/string");
const visibleSeats_1 = __importDefault(require("./visibleSeats"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    let values = data.toString().split("\r\n").map(e => e.split("")), temp = values.map(e => e.map(f => f));
    const getAdjacents = (x, y) => [
        values[x - 1]?.[y - 1],
        values[x - 1]?.[y + 0],
        values[x - 1]?.[y + 1],
        values[x + 0]?.[y - 1],
        values[x + 0]?.[y + 1],
        values[x + 1]?.[y - 1],
        values[x + 1]?.[y + 0],
        values[x + 1]?.[y + 1],
    ];
    for (let _ = 0; _ < 100; _++) {
        for (let x = 0; x < values.length; ++x) {
            for (let y = 0; y < values[x].length; ++y) {
                if (temp[x][y] === ".")
                    continue;
                let adj = getAdjacents(x, y);
                if (adj.amountOf("#") === 0 && values[x][y] === "L")
                    temp[x][y] = "#";
                else if (adj.amountOf("#") >= 4 && values[x][y] === "#")
                    temp[x][y] = "L";
            }
        }
        values = temp.map(e => e.map(f => f));
    }
    let totalUsed = 0;
    for (let line of temp)
        totalUsed += line.amountOf("#");
    console.log("Task1:", totalUsed);
    values = data.toString().split("\r\n").map(e => e.split(""));
    temp = values.map(e => e.map(f => f));
    for (let _ = 0; _ < 100; _++) {
        for (let x = 0; x < values.length; ++x) {
            for (let y = 0; y < values[x].length; ++y) {
                if (temp[x][y] === ".")
                    continue;
                let adj = visibleSeats_1.default(values, x, y);
                if (adj.amountOf("#") === 0 && values[x][y] === "L")
                    temp[x][y] = "#";
                else if (adj.amountOf("#") >= 5 && values[x][y] === "#")
                    temp[x][y] = "L";
            }
        }
        values = temp.map(e => e.map(f => f));
    }
    totalUsed = 0;
    for (let line of temp)
        totalUsed += line.amountOf("#");
    console.log("Task2:", totalUsed);
});
