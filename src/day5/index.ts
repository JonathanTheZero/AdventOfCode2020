import fs from "fs";
import "../utils/string";

const splitAt = (index: number) => (x: string | any[]) => [x.slice(0, index), x.slice(index)] as const;

fs.readFile("./data.txt", (err, data) => {
    let values = data.toString().split("\r\n");
    let highestID = -1;
    for (let val of values) {
        let seat = splitAt(7)(val) as [string, string];
        let row = parseInt(seat[0].replaceAll("F", "0").replaceAll("B", "1"), 2),
            column = parseInt(seat[1].replaceAll("R", "1").replaceAll("L", "0"), 2);

        let id = row * 8 + column;
        if (id > highestID) highestID = id;
    }
    console.log(highestID);

    let IDs: number[] = [];
    for (let val of values) {
        let seat = splitAt(7)(val) as [string, string];
        let row = parseInt(seat[0].replaceAll("F", "0").replaceAll("B", "1"), 2),
            column = parseInt(seat[1].replaceAll("R", "1").replaceAll("L", "0"), 2);

        IDs.push(row * 8 + column);
    }
    IDs.sort((a, b) => a - b);

    let last = -1;
    for (let i = 0; i < IDs.length; ++i) {
        let id = IDs[i];
        if (id - last == 2) 
            console.log(IDs[i - 1], id);
        last = id;
    }
});