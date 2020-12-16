"use strict";
Number.prototype.getBit = function (position) {
    return (Number(this) & (1 << position)) === 0 ? 0 : 1;
};
Number.prototype.setBit = function (position) {
    return (Number(this) | (1 << position));
};
Number.prototype.updateBit = function (position, bit) {
    const bitValueNormalized = bit ? 1 : 0;
    const clearMask = ~(1 << position);
    return (Number(this) & clearMask) | (bitValueNormalized << position);
};
