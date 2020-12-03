import fs from "fs";

type format = `${nums} - ${nums | `${nums}${exNums}`} ${letters}`;

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const vals = data.toString().split("\r\n");

    let count = 0, countTask2 = 0;

    for (let val of vals) {
        const t = val.split(":");
        const cat: format = <format>t[0], str = t[1];
        if (!cat || !str) continue;
        const char = cat[cat.length - 1];

        const [min, max] = cat.slice(0, -2).split("-").map(Number);

        /*console.log(`
            Cat: ${cat}
            Str: ${str}
            Char: ${char}
            Min/Max: ${min} ${max}
        `);*/

        let includeAmount = 0;
        for (let c of str)
            if (c == char) includeAmount++;

        if (includeAmount >= min && includeAmount <= max) count++;

        if (str[min] == char && str[max] != char || str[min] != char && str[max] == char) countTask2++;
    }

    console.log(count);
    console.log(countTask2);
});