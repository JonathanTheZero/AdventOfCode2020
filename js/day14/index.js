"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require("../utils/string");
require("../utils/array");
const bitCombinations_1 = require("./bitCombinations");
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const values = data.toString().split("\r\n");
    const res = [];
    let i = -1;
    for (let val of values) {
        if (val.startsWith("mask"))
            res[++i] = [val];
        else
            res[i].push(val);
    }
    const maskedNumbers = {};
    for (const chunks of res) {
        const mask = chunks[0].slice(7);
        for (let i = 1; i < chunks.length; ++i) {
            const chunk = chunks[i].split(" ");
            let current = Number(chunk.pop()).toString(2).padStart(mask.length, "0"), memIndex = chunk[0].replace(/^\D+/g, '').slice(0, -1);
            for (let i = 0; i < mask.length; ++i) {
                if (mask[i] === "X" || !current[i])
                    continue;
                current = current.replaceAt(i, mask[i]);
            }
            maskedNumbers[memIndex] = BigInt(parseInt(current, 2));
        }
    }
    let result = Object.keys(maskedNumbers).reduce((prev, curr) => prev + maskedNumbers[curr], 0n);
    console.log("Task1:", result);
    const maskedNumbers2 = {};
    for (const chunks of res) {
        const mask = chunks[0].slice(7);
        for (let i = 1; i < chunks.length; ++i) {
            const chunk = chunks[i].split(" ");
            let val = BigInt(chunk.pop()), memIndex = Number(chunk[0].replace(/^\D+/g, '').slice(0, -1)).toString(2).padStart(mask.length, "0"), res = "".padStart(mask.length, "_");
            for (let i = 0; i < mask.length; ++i) {
                let token = mask[i] === "0" ? memIndex[i] : mask[i];
                res = res.replaceAt(i, token);
            }
            let xIndices = res.split("").map((e, i) => e === "X" ? i : null).filter(e => e === 0 || e), nums = bitCombinations_1.possibleBinaryCombinations(xIndices.length);
            for (let num of nums) {
                let ind = res;
                for (let i = 0; i < xIndices.length; ++i) {
                    ind = ind.replaceAt(xIndices[i], num[i]);
                }
                maskedNumbers2[BigInt("0b" + ind)] = val;
            }
        }
    }
    result = Object.keys(maskedNumbers2).reduce((prev, curr) => prev + maskedNumbers2[curr], 0n);
    console.log("Task2:", result);
});
