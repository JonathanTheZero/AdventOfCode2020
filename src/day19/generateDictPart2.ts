export default function generateDictPart2(str: string): Map<number, RegExp> {
    let dict = new Map<number, RegExp>();
    const lines = str.split("\r\n");

    while (dict.size !== lines.length) {
        lines: for (let line of lines) {
            let [index, rule] = line.split(":");
            if (dict.get(Number(index))) continue;

            if (rule.trim().startsWith('"')) {
                dict.set(Number(index), new RegExp(rule.trim()[1]));
            } else {
                let o = rule.split("|"),
                    arr: [number, number][] = [];
                for (let p of o)
                    arr.push(p.trim().split(" ").map(Number) as [number, number]);


                //console.log(arr);

                if (arr.length == 2) {
                    if (arr.every(a => a.every(c => dict.get(c)))) {
                        let reg1 = "", reg2 = "";
                        arr[0].forEach(e => reg1 += dict.get(e)!.toString().slice(1, -1));
                        arr[1].forEach(e => reg2 += dict.get(e)!.toString().slice(1, -1));
                        //console.log(reg1, reg2)

                        //console.log(new RegExp(str1 + str2 + "|" + str3 + str4));
                        dict.set(Number(index), new RegExp(`((${reg1})|(${reg2}))`));
                    }
                } else if (arr.length == 1) {
                    if (arr[0].every(c => dict.get(c))) {
                        let reg = "";
                        arr[0].forEach(e => reg += dict.get(e)!.toString().slice(1, -1));
                        //console.log(new RegExp(str1 + str2));
                        dict.set(Number(index), new RegExp(reg));
                    }
                } else {
                    console.log(arr);
                }

                if (Number(index) === 8 && dict.get(8)) {
                    dict.set(8, new RegExp(`(${dict.get(8)!.toString().slice(1, -1)}){1,}`));
                } else if (Number(index) === 11 && dict.get(42) && dict.get(31)) {
                    let r42 = dict.get(42)!.toString().slice(1, -1),
                        r31 = dict.get(31)!.toString().slice(1, -1),
                        combined = new RegExp(`(${r42}${r31})`);

                    //Bruteforce-like thing, but it works
                    dict.set(11, new RegExp(`(${r42}(${r42}(${r42}(${r42}(${combined})?${r31})?${r31})?${r31})?${r31})`));
                }
            }
            //ordered:
            //console.log(new Map([...dict.entries()].sort((a,b) => a[0] - b[0])));
        }
    }

    return dict;
}