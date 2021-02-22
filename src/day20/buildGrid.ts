import { oppositeDirection } from "../utils/utils";
import Tile from "./tile.class";


export default function buildGrid(tiles: Tile[]): void {
    let iter = 0;
    for (const tile of tiles) {
        console.log(iter++);
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