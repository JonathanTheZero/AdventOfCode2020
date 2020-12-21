import fs from "fs";
import NDimensionalGrid from "./NDimensionalGrid.class";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const rows = data.toString().split("\r\n").map(row => row.split(""));

    const grid = new NDimensionalGrid<3>(3, [rows]);
    grid.run(6);

    console.log("Task1:", grid.activeCubes);

    const grid2 = new NDimensionalGrid<4>(4, [[rows]]);
    grid2.run(6);

    console.log("Task2", grid2.activeCubes);
});