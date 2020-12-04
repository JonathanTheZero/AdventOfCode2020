import fs from "fs";

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const rows = data.toString().split("\r\n");
    let index: [number, number] = [0, 0],
        encounters = 0,
        encountersTask2 = [];

    for (const row of rows) {
        //const row = rows[index[1]];

        if (row[index[0]] == "#")
            encounters++;

        index[0] += 3;
        if (index[0] >= row.length)
            index[0] %= row.length;
        index[1] += 1;
    }

    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    for (const [x, y] of slopes) {
        index = [0, 0];
        let temp = 0;
        while (index[1] < rows.length) {
            const row = rows[index[1]];
            if (row[index[0]] == "#")
                temp++;

            index[0] += x;
            if (index[0] >= row.length)
                index[0] %= row.length;
            index[1] += y;
        }
        encountersTask2.push(temp);
    }

    console.log(encounters);
    console.log(encountersTask2.reduce((a, b) => a * b));
});