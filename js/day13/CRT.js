"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chineseRemainderTheorem = void 0;
const absoluteModulo = (a, b) => ((a % b) + b) % b;
const getInverse = (a, mod) => {
    const b = a % mod;
    for (let i = 1; i < mod; i++)
        if ((b * i) % mod === 1)
            return i;
    return 1;
};
function chineseRemainderTheorem(lines) {
    const N = lines.reduce((acc, cur) => {
        if (cur === "x")
            return acc;
        return acc === null ? cur : acc * cur;
    }, null);
    const sum = lines.reduce((acc, cur, idx) => {
        if (cur === "x")
            return acc;
        const a = absoluteModulo(cur - idx, cur);
        const nU = N / cur;
        const inverse = getInverse(nU, cur);
        console.log(`x = ${a} (mod ${cur})`);
        return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
    }, BigInt(0));
    return sum % BigInt(N);
}
exports.chineseRemainderTheorem = chineseRemainderTheorem;
