"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const values = data.toString().split("\r\n"), callStack = [];
    let acc = 0, line = 1;
    while (true) {
        if (callStack.includes(line) || line > values.length) {
            console.log("Task1:", acc);
            break;
        }
        callStack.push(line);
        let command = values[line - 1];
        if (command.startsWith("acc")) {
            acc += Number(command.slice(4));
            line++;
        }
        else if (command.startsWith("jmp")) {
            line += Number(command.slice(4));
        }
        else if (command.startsWith("nop")) {
            line++;
        }
    }
    values.forEach((_val, i, arr) => {
        if (arr[i].startsWith("jmp")) {
            arr[i] = arr[i].replace("jmp", "nop");
            acc = 0;
            line = 1;
            for (let i = 0; i < 100000; ++i) {
                if (line >= arr.length) {
                    console.log(acc);
                    break;
                }
                let command = arr[line - 1];
                if (command.startsWith("acc")) {
                    acc += Number(command.slice(4));
                    line++;
                }
                else if (command.startsWith("jmp")) {
                    line += Number(command.slice(4));
                }
                else if (command.startsWith("nop")) {
                    line++;
                }
            }
            arr[i] = arr[i].replace("nop", "jmp");
        }
        else if (arr[i].startsWith("nop")) {
            arr[i] = arr[i].replace("nop", "jmp");
            acc = 0;
            line = 1;
            for (let i = 0; i < 100000; ++i) {
                if (line >= arr.length) {
                    console.log(acc);
                    break;
                }
                let command = arr[line - 1];
                if (command.startsWith("acc")) {
                    acc += Number(command.slice(4));
                    line++;
                }
                else if (command.startsWith("jmp")) {
                    line += Number(command.slice(4));
                }
                else if (command.startsWith("nop")) {
                    line++;
                }
            }
            arr[i] = arr[i].replace("jmp", "nop");
        }
    });
});
