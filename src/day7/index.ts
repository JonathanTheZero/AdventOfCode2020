import fs from "fs";
import "../utils/string";
import "../utils/array";
import { bagData, tree } from "./definitions";

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const values = data.toString().split("\r\n");

    const bagData: bagData = {},
        bagNames = /[^\s]* [^\s]* bag[s]?/gm,
        bagAmount = /\d* [^\s]* [^\s]* bag[s]?/gm;

    let matches: string[] = [];

    for (let val of values) {
        let matches = val.match(bagNames),
            bagname = matches![0].slice(0, -1).toString().split(" ").slice(0, -1).join(" "),
            names = matches!.slice(1).map(el => el.split(" ").slice(0, -1).join(" "));
        bagData[bagname] = names;

        let nums: number[] = [];
        try {
            nums = val.match(bagAmount)!.map(e => Number(e.match(/\d/g)![0]));
        } catch (e) { nums = [0]; }
    }

    for (let key in bagData)
        if (bagData[key].includes("shiny gold")) matches.push(key);

    for (let key in bagData)
        for (let vals of bagData[key])
            if (bagData[vals]?.includes("shiny gold")) matches.push(key);

    matches = matches.uniques();

    for (let i = 0; i < 5; ++i) //fuck recursion
        for (let key in bagData)
            for (let vals of bagData[key])
                if (!matches.includes(key) && (bagData[vals]?.includes("shiny gold") || bagData[vals]?.some(el => matches.includes(el)))) matches.push(key);

    matches = matches.uniques();


    //this one with help from Reddit: see https://www.reddit.com/r/adventofcode/comments/k8a31f/2020_day_07_solutions/gezaz0b?utm_source=share&utm_medium=web2x&context=3
    const graph: tree = {};

    for (let line of values) {
        let parent = line.split(" bags contain ")[0],
            childUnprocessed = line.split(" bags contain ")[1].split(" "),
            children: [string, number][] = [];

        for (let i = 0; i < childUnprocessed.length; i++) {
            const num = childUnprocessed[i];
            if (!isNaN(Number(num))) {
                let nextChild = childUnprocessed[i + 1] + " " + childUnprocessed[i + 2];
                children.push([nextChild, Number(num)]);
            }
        }
        graph[parent] = children;
    }

    let numBags = -1,
        queue: [string, number][] = [["shiny gold", 1]];

    while (queue.length > 0) {
        let currNode = queue.shift()!,
            [currBag, num] = currNode!;

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