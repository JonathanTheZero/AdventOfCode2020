export function possibleBinaryCombinations(digitAmount: number): string[] {
    let nums = [];

    // Convert to decimal
    let maxDecimal = parseInt("1".repeat(digitAmount), 2);

    // For every number between 0->decimal
    for (var i = 0; i <= maxDecimal; i++) {
        // Convert to binary, pad with 0, and add to final results
        nums.push(i.toString(2).padStart(digitAmount, '0'));
    }

    return nums;
}