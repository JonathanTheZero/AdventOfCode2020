import fs from "fs";
import "../utils/array";

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    let values = data.toString().split("\r\n").map(Number);

    let result;
    //const preamble = values.slice(0, 25);
    for (let i = 25; i < values.length; ++i) {
        //console.log(i, i - 25, values.slice(i - 25, i).length, values.slice(i - 25, i)[0], values.slice(i - 25, i));
        result = values[i];
        let sums = getSums(values.slice(i - 25, i));
        if (!sums.includes(result)) {
            console.log("The value is:", result);
            break;
        }
    }

    outer: for (let i = 0; i < values.length; ++i) {
        inner: for (let j = i + 1; j < values.length; ++j) {
            let tempArr = [...values.slice(i, j)];
            if (tempArr.sum() == result) {
                console.log(tempArr.min() + tempArr.max());
                break outer;
            }
        }
    }
});


function getSums(arr: Array<number>): Array<number> {
    const result: number[] = [];
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr.length; ++j) {
            let temp = arr[i] + arr[j];
            if (i == j || result.includes(temp)) continue;
            result.push(temp);
        }
    }
    return result;
}