"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateDict(str) {
    let dict = new Map();
    const lines = str.split("\r\n");
    while (dict.size !== lines.length) {
        lines: for (let line of lines) {
            let [index, rule] = line.split(":");
            if (dict.get(Number(index)))
                continue;
            if (rule.trim().startsWith('"')) {
                dict.set(Number(index), new RegExp(rule.trim()[1]));
            }
            else {
                let o = rule.split("|"), arr = [];
                for (let p of o)
                    arr.push(p.trim().split(" ").map(Number));
                if (arr.length == 2) {
                    if (arr.every(a => a.every(c => dict.get(c)))) {
                        let reg1 = "", reg2 = "";
                        arr[0].forEach(e => reg1 += dict.get(e).toString().slice(1, -1));
                        arr[1].forEach(e => reg2 += dict.get(e).toString().slice(1, -1));
                        dict.set(Number(index), new RegExp(`((${reg1})|(${reg2}))`));
                    }
                }
                else if (arr.length == 1) {
                    if (arr[0].every(c => dict.get(c))) {
                        let reg = "";
                        arr[0].forEach(e => reg += dict.get(e).toString().slice(1, -1));
                        dict.set(Number(index), new RegExp(`${reg}`));
                    }
                }
                else {
                    console.log(arr);
                }
            }
        }
    }
    return dict;
}
exports.default = generateDict;
