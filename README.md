# AdventOfCode2020

My version of the [AdventOfCode2020](https://adventofcode.com/2020), written in TypeScript (look in `/src/`).
The compiled JavaScript can be found in `/js/`.

The Target has been set to `ES2019`, since Node.js does not support optional chaining out of the box yet. 
In order to disable conflicts with BigInts by the compiler, the BigInt library has been included in the `./tsconfig.json` but no BigInt literals are written (`0n` is written as `BigInt(0)`)