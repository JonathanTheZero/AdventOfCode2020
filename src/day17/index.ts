import fs from "fs";
import Cube from "./cube.class";
import Grid from "./grid.class";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const rows = data.toString().split("\r\n");

    const grid = buildGrid(rows);
    console.log(grid);
});


function buildGrid(rows: string[]): Grid<Cube> {
    let x = rows.length, y = rows[0].length;
    const g = new Grid<Cube>(x, y, 1);

    for (let i = 0; i < x; ++i) {
        for (let j = 0; j < y; ++j) {
            g.add(x, y, 0, new Cube(rows[i][j] === "#"));
        }
    }
    return g;
}