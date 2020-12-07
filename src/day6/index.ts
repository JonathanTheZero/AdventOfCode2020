import fs from "fs";

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const vals = data.toString().split("\r\n\r\n").map(el => el.split("\r\n"));

    let totals = 0,
        totals2 = 0;
    for (let a of vals) {
        const uniques = a.join("").split("").filter((item, i, arr) => arr.indexOf(item) === i).join('');
        totals += uniques.length;
    }

    for (let arr of vals) {
        let count = 0;
        for (let char of arr[0]) {
            if (arr.every(el => el.includes(char))) count++;
        }
        totals2 += count;
    }

    console.log(totals, totals2);
});