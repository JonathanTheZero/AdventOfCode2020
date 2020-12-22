"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evaluateLinePBM(row) {
    var _a;
    while (row.includes("(")) {
        let lastOpeningBracket = row.lastIndexOf("(");
        let innerst = (_a = row.slice(lastOpeningBracket).match(/\([^\)]*\)/gm)) === null || _a === void 0 ? void 0 : _a[0];
        if (!innerst)
            break;
        row = row.replace(innerst, specialEvalPBM(innerst).toString());
    }
    return specialEvalPBM(row);
}
exports.default = evaluateLinePBM;
function specialEvalPBM(calc) {
    if (calc[0] === "(" && calc[calc.length - 1] === ")")
        calc = calc.slice(1, calc.length - 1);
    if (calc.includes("+")) {
        while (calc.includes("+")) {
            let o = calc.match(/\d{1,} \+ \d{1,}/gm)[0];
            calc = calc.replace(o, eval(o));
        }
    }
    return BigInt(eval(calc));
}
