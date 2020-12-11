"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
require("../utils/string");
require("../utils/array");
fs_1.default.readFile("./data.txt", (err, data) => {
    var _a, _b, _c;
    if (err)
        throw err;
    const values = data.toString().split("\r\n");
    const bagData = {}, bagNames = /[^\s]* [^\s]* bag[s]?/gm;
    let matches = [];
    for (let val of values) {
        let matches = val.match(bagNames), bagname = matches[0].slice(0, -1).toString().split(" ").slice(0, -1).join(" "), names = matches.slice(1).map(el => el.split(" ").slice(0, -1).join(" "));
        bagData[bagname] = names;
    }
    for (let key in bagData)
        if (bagData[key].includes("shiny gold"))
            matches.push(key);
    for (let key in bagData)
        for (let vals of bagData[key])
            if ((_a = bagData[vals]) === null || _a === void 0 ? void 0 : _a.includes("shiny gold"))
                matches.push(key);
    matches = matches.uniques();
    for (let i = 0; i < 5; ++i)
        for (let key in bagData)
            for (let vals of bagData[key])
                if (!matches.includes(key) && (((_b = bagData[vals]) === null || _b === void 0 ? void 0 : _b.includes("shiny gold")) || ((_c = bagData[vals]) === null || _c === void 0 ? void 0 : _c.some(el => matches.includes(el)))))
                    matches.push(key);
    matches = matches.uniques();
    const graph = {};
    for (let line of values) {
        let parent = line.split(" bags contain ")[0], childUnprocessed = line.split(" bags contain ")[1].split(" "), children = [];
        for (let i = 0; i < childUnprocessed.length; i++) {
            const num = childUnprocessed[i];
            if (!isNaN(Number(num))) {
                let nextChild = childUnprocessed[i + 1] + " " + childUnprocessed[i + 2];
                children.push([nextChild, Number(num)]);
            }
        }
        graph[parent] = children;
    }
    let numBags = -1, queue = [["shiny gold", 1]];
    while (queue.length > 0) {
        let currNode = queue.shift(), [currBag, num] = currNode;
        numBags += num;
        let subBags = graph[currBag];
        subBags.forEach(currentSub => {
            let [subBag, subNum] = currentSub;
            subNum *= num;
            queue.push([subBag, subNum]);
        });
    }
    console.log("Total matches", matches.length);
    console.log('Total bags', numBags);
});
