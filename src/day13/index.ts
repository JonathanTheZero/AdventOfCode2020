import fs from "fs";
import { chineseRemainderTheorem } from "./CRT";
import type { busObj } from "./definitons";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    let values = data.toString().split("\r\n");

    let timestamp = Number(values[0]),
        buslines = values[1].split(",").filter(el => el !== "x").map(Number);

    const results: busObj[] = [];

    for (let line of buslines) {
        for (let i = 1; true; i++) {
            if (line * i > timestamp) {
                results.push({ line, time: line * i });
                break;
            }
        }
    }

    const final = results.reduce((prev, curr) => prev.time < curr.time ? prev : curr);

    console.log("Task1:", (final.time - timestamp) * final.line);

    //Thanks to the subreddit, I know about the Chinese Remainder Theorem now:
    let busList = values[1].split(",").map(e => Number(e) || "x");

    console.log("Task2:", chineseRemainderTheorem(busList));
});