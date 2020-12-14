"use strict";
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, newStr) {
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}
String.prototype.containsAny = function (...values) {
    return values.some(el => this.includes(el));
};
String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + 1);
};
String.prototype.amountOf = function (item) {
    let result = 0;
    for (let i of this)
        if (i === item)
            result++;
    return result;
};
