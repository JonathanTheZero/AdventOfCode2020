import fs from "fs";
import { joltDict, pathDict } from "./definitions";

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const values = data.toString().split("\r\n").map(Number).sort((a, b) => a - b);


    values.unshift(0); //wall adapter
    values.push(values[values.length - 1] + 3); //phone adapter

    let jol1 = 0,
        jol3 = 0;

    for (let i = 0; i < values.length; ++i) {
        let diff = values[i] - values[i - 1];
        if (diff == 3) jol3++;
        if (diff == 1) jol1++;
    }
    console.log("Result:", jol1 * jol3);

    //alternate: see below
    const possibleSubs: joltDict = {};
    for (let val of values) {
        possibleSubs[val] = values.filter(a => a > val && a - val < 4);
    }

    const caluclateWay = (node: number[]) => {
        if (!node) return 0;
        if (!node.length) return 1;
        let result = 0;
        node.forEach(val => result += caluclateWay(possibleSubs[val]));
        return result;
    };

    const subPaths: pathDict = {},
        getSub = (index: number) => {
            if (possibleSubs[index].length === 0) return 1;
            if (subPaths[index]) return subPaths[index];
            let result = 0;
            possibleSubs[index].forEach(val => {
                result += getSub(val);
            });
            return result;
        };

    for (let i = values.length; i >= 0; --i) {
        if (!possibleSubs[i]) continue;

        if (possibleSubs[i].length == 0) subPaths[i] = 1;
        else {
            subPaths[i] = getSub(i);
        }
    }
    console.log("Result Part2:", subPaths[values[0]]); //1.5ms

    //console.log(caluclateWay(possibleSubs[values[0]]));
});




/*
    this SHOULD work but is really inefficient
    const getWay = (index: number, offset: 1 | 2 | 3): number => {
        let curr = values[index],
            temp = values[index + offset];
        if (index + offset >= values.length || temp - curr > 3) return 0;
        if (index === values.length - 1) { console.log("Finished", ++i); return 1; }
        return getWay(index + offset, 1) + getWay(index + offset, 2) + getWay(index + offset, 3);
    };

    //let ways = getWay(0, 1) + getWay(0, 2) + getWay(0, 3);
    //console.log(ways);
*/