import fs from "fs";

fs.readFile("./nums.txt", (err, data) => {
    if (err) throw err;
    const vals = data.toString().split("\r\n").map(Number);

    for (let num1 of vals)
        for (let num2 of vals)
            if (num1 + num2 == 2020)
                console.log(num1 * num2);

    for (let num1 of vals)
        for (let num2 of vals)
            for (let num3 of vals)
                if (num1 + num2 + num3 == 2020)
                    console.log(num1 * num2 * num3);

});