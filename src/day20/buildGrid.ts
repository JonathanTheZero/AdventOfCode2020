import { oppositeDirection } from "../utils/utils";
import Tile from "./tile.class";


export default function buildGrid(tiles: Tile[]): Tile[] {
    const usedTiles: Tile[] = [],
        length = tiles.length;
    while (usedTiles.length != length) {
        for (const tile of tiles) {
            for (let dir of <const>["top", "bottom", "left", "right"]) {
                if (tile[dir]) continue;
                let possibleTile =
                    tiles.filter(e => (e.edges.includes(tile.edge(dir)) || e.edges.includes([...tile.edge(dir)].reverse().join(""))) && e.id !== tile.id)[0];
                if (!possibleTile || possibleTile.neighbourIDs.includes(tile.id)) continue;
                for (let i = 0; i < 5; ++i) {
                    //console.log(possibleTile.edge(oppositeDirection(dir)),tile.edge(dir))
                    //console.log(possibleTile.toString(), possibleTile.edges, tile.edge(dir), "\n");
                    if (possibleTile.edge(oppositeDirection(dir)) !== tile.edge(dir)) {
                        tile[dir] = possibleTile;
                        possibleTile[oppositeDirection(dir)] = tile;
                        break;
                    }
                    possibleTile.rotate();
                }
                if (!tile[dir]) {
                    possibleTile.mirror();
                    for (let i = 0; i < 5; ++i) {
                        if (possibleTile.edge(oppositeDirection(dir)) !== tile.edge(dir)) {
                            tile[dir] = possibleTile;
                            possibleTile[oppositeDirection(dir)] = tile;
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