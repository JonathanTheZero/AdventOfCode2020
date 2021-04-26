"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
const mapIngredients_1 = __importDefault(require("./mapIngredients"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const foods = data.toString().split(os_1.EOL);
    let m = mapIngredients_1.default(foods);
    console.log(m);
});
