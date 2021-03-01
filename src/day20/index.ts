import fs from "fs";
import { buildGrid, buildGridString } from "./buildGrid";
import gridMatchMonster from "./gridMatchMonster";
import Seamonster from "./seamonster.class";
import Tile from "./tile.class";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const tilesData = data.toString().split("\r\n\r\n"),
        tiles: Tile[] = [];

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
    buildGrid(tiles);

    //console.log(tiles[0].toString(), "\n\n",  (tiles[0].mirror(), tiles[0].toString()));

    let leftTop = tiles.filter(e => !e.top && !e.left)[0],
        rightTop = tiles.filter(e => !e.top && !e.right)[0],
        leftBottom = tiles.filter(e => !e.bottom && !e.left)[0],
        rightBottom = tiles.filter(e => !e.bottom && !e.right)[0];

    //console.log(leftTop);
    for (const tile of tiles) {
        console.log(tile.id, "Left:", tile.left?.id, "Top:", tile.top?.id, "Right:", tile.right?.id, "Bottom:", tile.bottom?.id);
    }

    console.log("Final result:", leftBottom.id * leftTop.id * rightBottom.id * rightTop.id);

    let s: Seamonster = new Seamonster("                  # \n#    ##    ##    ###\n #  #  #  #  #  #   ");
    //console.log(s.look);

    let gridStr = buildGridString(leftTop, Math.sqrt(tiles.length));

    let a = gridMatchMonster(gridStr, s);
    console.log(a)
});