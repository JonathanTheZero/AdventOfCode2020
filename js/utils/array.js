"use strict";
Array.prototype.uniques = function () {
    return this.filter((item, i, arr) => arr.indexOf(item) === i);
};
