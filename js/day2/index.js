"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const vals = data.toString().split("\r\n");
    let count = 0, countTask2 = 0;
    for (let val of vals) {
        const t = val.split(":");
        const cat = t[0], str = t[1];
        if (!cat || !str)
            continue;
        const char = cat[cat.length - 1];
        const [min, max] = cat.slice(0, -2).split("-").map(Number);
        let includeAmount = 0;
        for (let c of str)
            if (c == char)
                includeAmount++;
        if (includeAmount >= min && includeAmount <= max)
            count++;
        if (str[min] == char && str[max] != char || str[min] != char && str[max] == char)
            countTask2++;
    }
    console.log(count);
    console.log(countTask2);
});
