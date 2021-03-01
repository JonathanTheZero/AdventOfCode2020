"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const buildGrid_1 = require("./buildGrid");
const gridMatchMonster_1 = __importDefault(require("./gridMatchMonster"));
const seamonster_class_1 = __importDefault(require("./seamonster.class"));
const tile_class_1 = __importDefault(require("./tile.class"));
fs_1.default.readFile("./data.txt", (err, data) => {
    var _a, _b, _c, _d;
    if (err)
        throw err;
    const tilesData = data.toString().split("\r\n\r\n"), tiles = [];
    for (const tile of tilesData) {
        const lines = tile.split("\r\n");
        let id = Number(lines.shift().slice(5, -1));
        tiles.push(new tile_class_1.default(id, lines.map(e => e.split(""))));
    }
    buildGrid_1.buildGrid(tiles);
    let leftTop = tiles.filter(e => !e.top && !e.left)[0], rightTop = tiles.filter(e => !e.top && !e.right)[0], leftBottom = tiles.filter(e => !e.bottom && !e.left)[0], rightBottom = tiles.filter(e => !e.bottom && !e.right)[0];
    for (const tile of tiles) {
        console.log(tile.id, "Left:", (_a = tile.left) === null || _a === void 0 ? void 0 : _a.id, "Top:", (_b = tile.top) === null || _b === void 0 ? void 0 : _b.id, "Right:", (_c = tile.right) === null || _c === void 0 ? void 0 : _c.id, "Bottom:", (_d = tile.bottom) === null || _d === void 0 ? void 0 : _d.id);
    }
    console.log("Final result:", leftBottom.id * leftTop.id * rightBottom.id * rightTop.id);
    let s = new seamonster_class_1.default("                  # \n#    ##    ##    ###\n #  #  #  #  #  #   ");
    let gridStr = buildGrid_1.buildGridString(leftTop, Math.sqrt(tiles.length));
    let a = gridMatchMonster_1.default(gridStr, s);
    console.log(a);
});
