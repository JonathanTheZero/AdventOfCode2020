import fs from "fs";
import "../utils/string";
import "../utils/array";
import type { memObj } from "./definitions";
import { possibleBinaryCombinations } from "./bitCombinations";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const values = data.toString().split("\r\n");

    const res: string[][] = [];
    let i = -1;
    for (let val of values) {
        if (val.startsWith("mask")) res[++i] = [val];
        else res[i].push(val);
    }

    const maskedNumbers: memObj = {};

    for (const chunks of res) {
        const mask = chunks[0].slice(7);
        for (let i = 1; i < chunks.length; ++i) {
            const chunk = chunks[i].split(" ");
            let current = Number(chunk.pop()!).toString(2).padStart(mask.length, "0"), //fill string up with 0s for string bitwise operations
                memIndex = chunk[0].replace(/^\D+/g, '').slice(0, -1); //extract index
            for (let i = 0; i < mask.length; ++i) {
                if (mask[i] === "X" || !current[i])
                    continue;
                current = current.replaceAt(i, mask[i]);
            }
            maskedNumbers[memIndex] = BigInt(parseInt(current, 2));
        }
    }

    let result = Object.keys(maskedNumbers).reduce((prev, curr) => prev + maskedNumbers[curr], BigInt(0));

    console.log("Task1:", result);

    const maskedNumbers2: memObj = {};

    for (const chunks of res) {
        const mask = chunks[0].slice(7);
        for (let i = 1; i < chunks.length; ++i) {
            const chunk = chunks[i].split(" ");
            let val = BigInt(chunk.pop()!),
                memIndex = Number(chunk[0].replace(/^\D+/g, '').slice(0, -1)).toString(2).padStart(mask.length, "0"),
                res = "".padStart(mask.length, "_");
            for (let i = 0; i < mask.length; ++i) {
                let token = mask[i] === "0" ? memIndex[i] : mask[i];
                res = res.replaceAt(i, token)
            }
            let xIndices = res.split("").map((e, i) => e === "X" ? i : null).filter(e => e === 0 || e) as number[],
                nums = possibleBinaryCombinations(xIndices.length);

            for (let num of nums) {
                let ind = res;
                for (let i = 0; i < xIndices.length; ++i) {
                    ind = ind.replaceAt(xIndices[i], num[i]);
                }
                //@ts-ignore... throwing an error when trying to Index using a BigInt lol
                maskedNumbers2[BigInt("0b" + ind)] = val;
            }
        }
    }

    result = Object.keys(maskedNumbers2).reduce((prev, curr) => prev + maskedNumbers2[curr], BigInt(0));

    console.log("Task2:", result)
});