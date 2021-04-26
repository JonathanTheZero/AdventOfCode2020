import fs from "fs";
import { EOL } from "os";
import mapIngredients from "./mapIngredients";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const foods = data.toString().split(EOL);

    let m = mapIngredients(foods);
    console.log(m);
});