//Huge thanks to https://www.reddit.com/r/adventofcode/comments/kc4njx/2020_day_13_solutions/gfswxva?utm_source=share&utm_medium=web2x&context=3
//I still don't know why but my own approach wasn't working, so yeah... here ya go


// safe with negative numbers unlike JS % operator
const absoluteModulo = (a: number, b: number) => ((a % b) + b) % b;

// returns x where (a * x) % b == 1
// https://rosettacode.org/wiki/Modular_inverse
const getInverse = (a: number, mod: number) => {
    const b = a % mod;
    for (let i = 1; i < mod; i++)
        if ((b * i) % mod === 1)
            return i;
    return 1;
};

export function chineseRemainderTheorem(lines: (number | "x")[]) {
    // x =- a (mod n)
    // x - some unknown, constant value of t
    // a - bus number MINUS offset % bus number
    // n - cycle length (= bus number)

    // to solve each row, we also need
    // N - all n's added up
    // nU = N / n
    // i - inverse modulo

    //@ts-ignore ???? wtf TypeScript
    const N: number = lines.reduce((acc, cur) => {
        if (cur === "x") return acc;
        return acc === null ? cur : acc! * cur;
    }, null);

    const sum = lines.reduce((acc, cur, idx) => {
        if (cur === "x") return acc;

        const a = absoluteModulo(cur - idx, cur);
        const nU = N / cur;
        const inverse = getInverse(nU, cur);
        console.log(`x = ${a} (mod ${cur})`);
        return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
    }, 0n);

    return sum % BigInt(N);
}