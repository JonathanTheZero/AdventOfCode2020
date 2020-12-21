"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const NDimensionalGrid_class_1 = __importDefault(require("./NDimensionalGrid.class"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const rows = data.toString().split("\r\n").map(row => row.split(""));
    const grid = new NDimensionalGrid_class_1.default(3, [rows]);
    grid.run(6);
    console.log("Task1:", grid.activeCubes);
    const grid2 = new NDimensionalGrid_class_1.default(4, [[rows]]);
    grid2.run(6);
    console.log("Task2", grid2.activeCubes);
});
