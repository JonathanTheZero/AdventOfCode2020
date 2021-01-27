import fs from "fs";
import generateDictPart2 from "./alterDict";
import generateDict from "./generateDict";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const [rules, m] = data.toString().split("\r\n\r\n");

    let ruleDict = generateDict(rules);
    //console.log(ruleDict);

    let task1 = 0;

    const messages = m.split("\r\n");
    //console.log(new RegExp(`^${ruleDict.get(0)!.toString().slice(1, -1)}$`));
    for (let me of messages) {
        if (me.match(new RegExp(`^${ruleDict.get(0)!.toString().slice(1, -1)}$`)))
            task1++;
    }

    console.log("Task1:", task1);

    let ruleDict2 = generateDictPart2(rules),
        task2 = 0;
    for (let me of messages) {
        if (me.match(new RegExp(`^${ruleDict2.get(0)!.toString().slice(1, -1)}$`)))
            task2++;
    }

    console.log("Task2:", task2);
});