import fs from "fs";

fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const values = data.toString().split("\r\n"),
        callStack: number[] = [];

    let acc = 0,
        line = 1;

    //task 1
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
        } else if (command.startsWith("jmp")) {
            line += Number(command.slice(4));
        } else if (command.startsWith("nop")) {
            line++;
        }
    }

    //task 2
    //brute force-like approach beause too lazy to remodel everything
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
                } else if (command.startsWith("jmp")) {
                    line += Number(command.slice(4));
                } else if (command.startsWith("nop")) {
                    line++;
                }
            }
            arr[i] = arr[i].replace("nop", "jmp");
        } else if (arr[i].startsWith("nop")) {
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
                } else if (command.startsWith("jmp")) {
                    line += Number(command.slice(4));
                } else if (command.startsWith("nop")) {
                    line++;
                }
            }
            arr[i] = arr[i].replace("jmp", "nop");
        }
    });
});