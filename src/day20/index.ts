import fs from "fs";
import buildGrid from "./buildGrid";
import Tile from "./tile.class";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const tilesData = data.toString().split("\r\n\r\n");
    let tiles: Tile[] = [];

    for (const tile of tilesData) {
        const lines = tile.split("\r\n");
        let id = Number(lines.shift()!.slice(5, -1));

        tiles.push(new Tile(id, lines.map(e => e.split(""))));
    }
    /*for(let i = 0; i < 5;++i){
        console.log(tiles[0].toString(), tiles[0].edges);
        console.log("\n\n");
        tiles[0].rotate()
    }*/
    const entryPoint = tiles[0];
    tiles = buildGrid(tiles);

    const leftTop = tiles.filter(e => !e.top && !e.left)[0],
        rightTop = tiles.filter(e => !e.top && !e.right)[0],
        leftBottom = tiles.filter(e => !e.bottom && !e.left)[0],
        rightBottom = tiles.filter(e => !e.bottom && !e.right)[0];

        console.log(leftTop);

        console.log(leftBottom.id * leftTop.id * rightBottom.id * rightTop.id);
});