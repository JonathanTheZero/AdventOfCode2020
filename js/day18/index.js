"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const evaluateLineLTR_1 = __importDefault(require("./evaluateLineLTR"));
const evaluateLinePBM_1 = __importDefault(require("./evaluateLinePBM"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const rows = data.toString().split("\r\n");
    let result = 0;
    for (const row of rows) {
        result += evaluateLineLTR_1.default(row);
    }
    console.log("Task1:", result);
    let result2 = BigInt(0);
    for (const row of rows) {
        result2 += evaluateLinePBM_1.default(row);
        console.log(evaluateLinePBM_1.default(row));
    }
    console.log("Task2:", result2);
});
