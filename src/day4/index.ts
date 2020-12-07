import fs from "fs";
import { pid } from "process";

const fields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
]; //cid not required

fs.readFile("./data.txt", (err, data) => {
    const values: string[][] = [];
    let validCount = 0,
        validTask2 = 0;
    for (let v of data.toString().split("\r\n\r\n")) {
        let temp = v.split(/\r?\n|\r| /g);
        if (temp[temp.length - 1] == "") temp.length -= 1;
        values.push(temp);
    }

    for (let v of values) {
        let keys = [];
        for (let single of v)
            keys.push(single.split(":")[0]);
        if (hasValidFields(keys)) validCount++
    }

    for (let v of values) {
        let keys = [],
            dict: { [key: string]: string } = {};
        for (let single of v) {
            let temp = single.split(":");
            keys.push(temp[0]);
            dict[temp[0]] = temp[1];
        }
        if (hasValidFields(keys) && hasValidValues(dict)) {
            validTask2++;
        }
    }

    console.log(validCount);
    console.log(validTask2);
});


function hasValidFields(arr: string[]): boolean {
    let count = 0;

    for (let key of arr)
        if (fields.includes(key)) count++;

    return count == fields.length;
}


function hasValidValues(dict: { [key: string]: string }): boolean {
    //console.log(dict);
    let byr = Number(dict.byr);
    if (!byr || byr < 1920 || byr > 2002) return false;

    let iyr = Number(dict.iyr);
    if (!iyr || iyr < 2010 || iyr > 2020) return false;

    let eyr = Number(dict.eyr);
    if (!eyr || eyr < 2020 || eyr > 2030) return false;

    let height = dict.hgt;
    if (height.includes("cm")) {
        let num = Number(height.slice(0, 3));
        if (!num || num < 150 || num > 193) return false;
    } else if (height.includes("in")) {
        let num = Number(height.slice(0, 2));
        if (!num || num < 59 || num > 76) return false;
    } else return false;

    let col = dict.hcl;
    if (!col || col[0] != "#" || isNaN(parseInt(col.slice(-6), 16))) return false;

    const ecls = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    let ecl = dict.ecl;
    if (!ecl || !ecls.includes(ecl)) return false;

    if (dict?.pid?.length !== 9) return false;

    return true;
}