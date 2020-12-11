"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
fs_1.default.readFile("./nums.txt", (err, data) => {
    if (err)
        throw err;
    const vals = data.toString().split("\r\n").map(Number);
    for (let num1 of vals)
        for (let num2 of vals)
            if (num1 + num2 == 2020)
                console.log(num1 * num2);
    for (let num1 of vals)
        for (let num2 of vals)
            for (let num3 of vals)
                if (num1 + num2 + num3 == 2020)
                    console.log(num1 * num2 * num3);
});
