import fs from "fs";
import generateDict from "./generateDict";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const [rules, m] = data.toString().split("\r\n\r\n");

    let ruleDict = generateDict(rules);
    //console.log(ruleDict);

    let task1 = 0;

    const messages = m.split("\r\n");
    console.log(new RegExp(`^${ruleDict.get(0)!.toString().slice(1, -1)}$`));
    for (let me of messages) {
        if (me.match(new RegExp(`^${ruleDict.get(0)!.toString().slice(1, -1)}$`))) task1++;
    }
    console.log("Task1:", task1);
});