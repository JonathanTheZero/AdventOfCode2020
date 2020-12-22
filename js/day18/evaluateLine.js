"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluateLine(row) {
    var _a;
    while (row.includes("(")) {
        let lastOpeningBracket = row.lastIndexOf("(");
        let innerst = (_a = row.slice(lastOpeningBracket).match(/\([^\)]*\)/gm)) === null || _a === void 0 ? void 0 : _a[0];
        if (!innerst)
            break;
        row = row.replace(innerst, specialEval(innerst).toString());
    }
    return specialEval(row);
}
exports.default = evaluateLine;
function specialEval(calc) {
    if (calc[0] === "(" && calc[calc.length - 1] === ")")
        calc = calc.slice(1, calc.length - 1);
    const numStack = calc.split(" ");
    if (!numStack.length)
        return 0;
    let result = Number(numStack.shift());
    for (let i = 0; i < numStack.length; ++i) {
        let token = numStack[i];
        console.log("Token:", token);
        if (token === "+") {
            console.log(numStack[i + 1]);
            result += Number(numStack[++i]);
        }
        else if (token === "*") {
            result *= Number(numStack[++i]);
        }
        else {
            throw "Unexpected token: " + token;
        }
    }
    return result;
}
