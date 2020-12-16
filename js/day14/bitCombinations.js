"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.possibleBinaryCombinations = void 0;
function possibleBinaryCombinations(digitAmount) {
    let nums = [];
    let maxDecimal = parseInt("1".repeat(digitAmount), 2);
    for (var i = 0; i <= maxDecimal; i++) {
        nums.push(i.toString(2).padStart(digitAmount, '0'));
    }
    return nums;
}
exports.possibleBinaryCombinations = possibleBinaryCombinations;
