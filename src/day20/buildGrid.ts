import { oppositeDirection } from "../utils/utils";
import type { Nullable } from "../utils/utilTypes";
import Tile from "./tile.class";


export function buildGrid(tiles: Tile[]): void {
    //let iter = 0;
    for (const tile of tiles) {
        //console.log(iter++);
        for (let dir of <const>["top", "bottom", "left", "right"]) {
            if (tile[dir] || tile.neighbourLength === 4)
                continue;
            let oppDir = oppositeDirection(dir);
            const possibleTiles = tiles.filter(
                e => (e.edges.includes(tile.edge(dir)) || e.edges.includes([...tile.edge(dir)].reverse().join("")))
                    && e.id !== tile.id
            );

            for (let possibleTile of possibleTiles) {
                if (tile.neighbourIDs.includes(possibleTile.id) || possibleTile[oppDir] || tile[dir] || possibleTile.neighbourLength === 4)
                    continue;
                for (let i = 0; i < 4; ++i) {
                    //console.log(possibleTile.edge(oppDir),tile.edge(dir))
                    //console.log(possibleTile.toString(), possibleTile.edges, tile.edge(dir), "\n");
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


export function buildGridString(topLeft: Tile, dimension: number): string {
    let resStr: string = "",
        lineStrs: string[][][] = [], 
        curr: Nullable<Tile> = topLeft,
        lineBegin: Nullable<Tile> = topLeft;

    for (let i = 0; i < dimension; ++i) {
        while (curr && lineBegin) {
            lineStrs.push(curr.gridWithoutEdges);
            curr = curr.right;
        }
        lineBegin = lineBegin?.bottom;
        curr = lineBegin;
        resStr += gridToString(lineStrs);
        lineStrs = [];
    }

    return resStr;
}


function gridToString(grids: string[][][]): string {
    let resStr: string = "",
        //join lines, since single characters can be ignored
        mappedGrids: string[][] = grids.map(e => e.map(f => f.join("")));

    for (let i = 0; i < grids[0].length; ++i) {
        for (let grid of mappedGrids) {
            resStr += grid[i];
        }
        resStr += "\n";
    }

    return resStr;
}