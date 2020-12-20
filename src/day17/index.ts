import fs from "fs";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;

    const rows = data.toString().split("\r\n");
});