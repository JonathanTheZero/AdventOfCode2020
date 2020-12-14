"use strict";
Array.prototype.uniques = function () {
    return this.filter((item, i, arr) => arr.indexOf(item) === i);
};
Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0);
};
Array.prototype.min = function () {
    return Math.min(...this);
};
Array.prototype.max = function () {
    return Math.max(...this);
};
Array.prototype.amountOf = function (item) {
    return this.filter(el => el === item).length;
};
