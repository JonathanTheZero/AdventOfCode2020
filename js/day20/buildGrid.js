"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildGridString = exports.buildGrid = void 0;
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
exports.buildGrid = buildGrid;
function buildGridString(topLeft, dimension) {
    let resStr = "", lineStrs = [], curr = topLeft, lineBegin = topLeft;
    for (let i = 0; i < dimension; ++i) {
        while (curr && lineBegin) {
            lineStrs.push(curr.gridWithoutEdges);
            curr = curr.right;
        }
        lineBegin = lineBegin === null || lineBegin === void 0 ? void 0 : lineBegin.bottom;
        curr = lineBegin;
        resStr += gridToString(lineStrs);
        lineStrs = [];
    }
    return resStr;
}
exports.buildGridString = buildGridString;
function gridToString(grids) {
    let resStr = "", mappedGrids = grids.map(e => e.map(f => f.join("")));
    for (let i = 0; i < grids[0].length; ++i) {
        for (let grid of mappedGrids) {
            resStr += grid[i];
        }
        resStr += "\n";
    }
    return resStr;
}
