"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const buildGrid_1 = __importDefault(require("./buildGrid"));
const tile_class_1 = __importDefault(require("./tile.class"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const tilesData = data.toString().split("\r\n\r\n");
    let tiles = [];
    for (const tile of tilesData) {
        const lines = tile.split("\r\n");
        let id = Number(lines.shift().slice(5, -1));
        tiles.push(new tile_class_1.default(id, lines.map(e => e.split(""))));
    }
    const entryPoint = tiles[0];
    tiles = buildGrid_1.default(tiles);
    const leftTop = tiles.filter(e => !e.top && !e.left)[0], rightTop = tiles.filter(e => !e.top && !e.right)[0], leftBottom = tiles.filter(e => !e.bottom && !e.left)[0], rightBottom = tiles.filter(e => !e.bottom && !e.right)[0];
    console.log(leftTop);
    console.log(leftBottom.id * leftTop.id * rightBottom.id * rightTop.id);
});
