"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generateDict_1 = __importDefault(require("./generateDict"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const [rules, m] = data.toString().split("\r\n\r\n");
    let ruleDict = generateDict_1.default(rules);
    let task1 = 0;
    const messages = m.split("\r\n");
    console.log(new RegExp(`^${ruleDict.get(0).toString().slice(1, -1)}$`));
    for (let me of messages) {
        if (me.match(new RegExp(`^${ruleDict.get(0).toString().slice(1, -1)}$`)))
            task1++;
    }
    console.log("Task1:", task1);
});
