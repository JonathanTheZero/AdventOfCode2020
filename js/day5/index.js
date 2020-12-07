"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require("../utils/string");
const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
fs_1.default.readFile("./data.txt", (err, data) => {
    let values = data.toString().split("\r\n");
    let highestID = -1;
    for (let val of values) {
        let seat = splitAt(7)(val);
        let row = parseInt(seat[0].replaceAll("F", "0").replaceAll("B", "1"), 2), column = parseInt(seat[1].replaceAll("R", "1").replaceAll("L", "0"), 2);
        let id = row * 8 + column;
        if (id > highestID)
            highestID = id;
    }
    console.log(highestID);
    let IDs = [];
    for (let val of values) {
        let seat = splitAt(7)(val);
        let row = parseInt(seat[0].replaceAll("F", "0").replaceAll("B", "1"), 2), column = parseInt(seat[1].replaceAll("R", "1").replaceAll("L", "0"), 2);
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
