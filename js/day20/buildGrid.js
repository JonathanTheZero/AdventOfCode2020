"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
function buildGrid(tiles) {
    let iter = 0;
    for (const tile of tiles) {
        console.log(iter++);
        for (let dir of ["top", "bottom", "left", "right"]) {
            if (tile[dir] || tile.neighbourLength === 4)
                continue;
            let oppDir = utils_1.oppositeDirection(dir);
            const possibleTiles = tiles.filter(e => (e.edges.includes(tile.edge(dir)) || e.edges.includes([...tile.edge(dir)].reverse().join("")))
                && e.id !== tile.id);
            for (let possibleTile of possibleTiles) {
                if (tile.neighbourIDs.includes(possibleTile.id) || possibleTile[oppDir] || tile[dir] || possibleTile.neighbourLength === 4)
                    continue;
                for (let i = 0; i < 4; ++i) {
                    if (possibleTile.edge(oppDir) === tile.edge(dir)) {
                        tile[dir] = possibleTile;
                        possibleTile[oppDir] = tile;
                        break;
                    }
                    possibleTile.rotate();
                    possibleTile.resetChanges();
                }
                if (!tile[dir]) {
                    possibleTile.mirror();
                    possibleTile.resetChanges();
                    for (let i = 0; i < 4; ++i) {
                        if (possibleTile.edge(oppDir) === tile.edge(dir)) {
                            tile[dir] = possibleTile;
                            possibleTile[oppDir] = tile;
                            break;
                        }
                        possibleTile.rotate();
                        possibleTile.resetChanges();
                    }
                }
            }
        }
    }
}
exports.default = buildGrid;
