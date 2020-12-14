import fs from "fs";
import type { adjacents, seat } from "./definitions";
import "../utils/array";
import "../utils/string";
import visibleSeats from "./visibleSeats";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    let values = data.toString().split("\r\n").map(e => e.split("")) as seat[][],
        temp = values.map(e => e.map(f => f));

    const getAdjacents = (x: number, y: number): adjacents => [
        values[x - 1]?.[y - 1] as seat,
        values[x - 1]?.[y + 0] as seat,
        values[x - 1]?.[y + 1] as seat,
        values[x + 0]?.[y - 1] as seat,
        values[x + 0]?.[y + 1] as seat,
        values[x + 1]?.[y - 1] as seat,
        values[x + 1]?.[y + 0] as seat,
        values[x + 1]?.[y + 1] as seat,
    ];


    //yes yes, I'm lazy
    for (let _ = 0; _ < 100; _++) {
        for (let x = 0; x < values.length; ++x) {
            for (let y = 0; y < values[x].length; ++y) {
                if (temp[x][y] === ".") continue;

                let adj = getAdjacents(x, y);

                if (adj.amountOf("#") === 0 && values[x][y] === "L")
                    temp[x][y] = "#";
                else if (adj.amountOf("#") >= 4 && values[x][y] === "#")
                    temp[x][y] = "L";
            }
        }
        values = temp.map(e => e.map(f => f)); //shallow copy and stuff
    }

    let totalUsed = 0;
    for (let line of temp)
        totalUsed += line.amountOf("#");

    console.log("Task1:", totalUsed);
    

    values = data.toString().split("\r\n").map(e => e.split("")) as seat[][];
    temp = values.map(e => e.map(f => f));

    for (let _ = 0; _ < 100; _++) {
        for (let x = 0; x < values.length; ++x) {
            for (let y = 0; y < values[x].length; ++y) {
                if (temp[x][y] === ".") continue;

                let adj = visibleSeats(values, x, y);
                
                if (adj.amountOf("#") === 0 && values[x][y] === "L")
                    temp[x][y] = "#";
                else if (adj.amountOf("#") >= 5 && values[x][y] === "#")
                    temp[x][y] = "L";
            }
        }
        values = temp.map(e => e.map(f => f)); //shallow copy and stuff
    }

    totalUsed = 0;
    for (let line of temp)
        totalUsed += line.amountOf("#");

    console.log("Task2:", totalUsed);
});