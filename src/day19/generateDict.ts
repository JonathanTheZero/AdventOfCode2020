export default function generateDict(str: string): Map<number, RegExp> {
    let dict = new Map<number, RegExp>();
    const lines = str.split("\r\n");

    /*for (let line of str.split("\r\n")) {
        let [index, rule] = line.split(":");
        if (rule.trim().startsWith('"')) {
            dict.set(Number(index), rule.trim()[1]);
        } else {
            let o = rule.split("|"),
                arr = [];
            for (let p of o)
                arr.push(p.trim().split(" ").map(Number) as [number, number]);

            dict.set(Number(index), arr);
        }
    }*/

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
                        dict.set(Number(index), new RegExp(`${reg}`));
                    }
                } else {
                    console.log(arr);
                }
            }
            //ordered:
            //console.log(new Map([...dict.entries()].sort((a,b) => a[0] - b[0])));
        }
    }

    return dict;
}