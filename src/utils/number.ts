type bit = 0 | 1;

interface Number {
    getBit(position: number): bit;
    setBit(position: number): number;
    updateBit(position: number, bit: bit): number;
}


Number.prototype.getBit = function (position: number): bit {
    return (Number(this) & (1 << position)) === 0 ? 0 : 1;
};

Number.prototype.setBit = function (position: number): number {
    return (Number(this) | (1 << position));
};

Number.prototype.updateBit = function (position, bit: bit) {
    const bitValueNormalized = bit ? 1 : 0;
    const clearMask = ~(1 << position);
    return (Number(this) & clearMask) | (bitValueNormalized << position);
};