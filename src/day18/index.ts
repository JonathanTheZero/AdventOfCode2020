import fs from "fs";
import evaluateLineLTR from "./evaluateLineLTR";
import evaluateLinePBM from "./evaluateLinePBM";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const rows = data.toString().split("\r\n");

    let result = 0;
    for (const row of rows) {
        result += evaluateLineLTR(row);
    }

    console.log("Task1:", result);


    let result2 = BigInt(0);
    for (const row of rows) {
        result2 += evaluateLinePBM(row);
        console.log(evaluateLinePBM(row));
    }

    console.log("Task2:", result2); //why are these numbers always so goddamn big????
});