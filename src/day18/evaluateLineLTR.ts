export default function evaluateLineLTR(row: string): number {
    //get rid of parantheses
    while (row.includes("(")) {
        let lastOpeningBracket = row.lastIndexOf("(");

        let innerst = row.slice(lastOpeningBracket).match(/\([^\)]*\)/gm)?.[0];
        if (!innerst) break;
        //console.log(row);
        row = row.replace(innerst, specialEvalLTR(innerst).toString());
        //console.log(row);
    }

    return specialEvalLTR(row);
}


function specialEvalLTR(calc: string): number {
    if (calc[0] === "(" && calc[calc.length - 1] === ")")
        calc = calc.slice(1, calc.length - 1);
    const numStack = calc.split(" ");
    if (!numStack.length) return 0;

    let result = Number(numStack.shift());

    //console.log(calc, result, numStack);
    for (let i = 0; i < numStack.length; ++i) {
        let token = numStack[i];
        //console.log("Token:", token);
        if (token === "+") {
            result += Number(numStack[++i]);
        } else if (token === "*") {
            result *= Number(numStack[++i]);
        } else {
            throw new Error("Unexpected token: " + token);
        }
        //console.log("Result", result);
    }
    //console.log(calc,result);

    //console.log(calc, result, "\n");
    return result;
}