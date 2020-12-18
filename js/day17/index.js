"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cube_class_1 = __importDefault(require("./cube.class"));
const grid_class_1 = __importDefault(require("./grid.class"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const rows = data.toString().split("\r\n");
    const grid = buildGrid(rows);
    console.log(grid);
});
function buildGrid(rows) {
    let x = rows.length, y = rows[0].length;
    const g = new grid_class_1.default(x, y, 1);
    for (let i = 0; i < x; ++i) {
        for (let j = 0; j < y; ++j) {
            g.add(x, y, 0, new cube_class_1.default(rows[i][j] === "#"));
        }
    }
    return g;
}
