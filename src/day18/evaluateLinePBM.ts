export default function evaluateLinePBM(row: string): bigint {
    //get rid of parantheses
    while (row.includes("(")) {
        let lastOpeningBracket = row.lastIndexOf("(");

        let innerst = row.slice(lastOpeningBracket).match(/\([^\)]*\)/gm)?.[0];
        if (!innerst) break;
        //console.log(row);
        row = row.replace(innerst, specialEvalPBM(innerst).toString());
        //console.log(row);
    }

    return specialEvalPBM(row);
}


function specialEvalPBM(calc: string): bigint {
    if (calc[0] === "(" && calc[calc.length - 1] === ")")
        calc = calc.slice(1, calc.length - 1);

    if (calc.includes("+")) {
        while (calc.includes("+")) {
            let o = calc.match(/\d{1,} \+ \d{1,}/gm)![0];
            //console.log(occurences);
            //console.log(calc, o, eval(o));
            calc = calc.replace(o, eval(o));
            //console.log(calc, "\n");
        }
        //console.log(calc);
    }
    return BigInt(eval(calc));
}