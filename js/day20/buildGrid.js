"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
function buildGrid(tiles) {
    const usedTiles = [], length = tiles.length;
    while (usedTiles.length != length) {
        for (const tile of tiles) {
            for (let dir of ["top", "bottom", "left", "right"]) {
                if (tile[dir])
                    continue;
                let possibleTile = tiles.filter(e => (e.edges.includes(tile.edge(dir)) || e.edges.includes([...tile.edge(dir)].reverse().join(""))) && e.id !== tile.id)[0];
                if (!possibleTile || possibleTile.neighbourIDs.includes(tile.id))
                    continue;
                for (let i = 0; i < 5; ++i) {
                    if (possibleTile.edge(utils_1.oppositeDirection(dir)) !== tile.edge(dir)) {
                        tile[dir] = possibleTile;
                        possibleTile[utils_1.oppositeDirection(dir)] = tile;
                        break;
                    }
                    possibleTile.rotate();
                }
                if (!tile[dir]) {
                    possibleTile.mirror();
                    for (let i = 0; i < 5; ++i) {
                        if (possibleTile.edge(utils_1.oppositeDirection(dir)) !== tile.edge(dir)) {
                            tile[dir] = possibleTile;
                            possibleTile[utils_1.oppositeDirection(dir)] = tile;
                            break;
                        }
                        possibleTile.rotate();
                    }
                }
                if (!usedTiles.includes(tile)) {
                    usedTiles.push(tile);
                }
            }
        }
        console.log(usedTiles.length);
    }
    return tiles;
}
exports.default = buildGrid;
