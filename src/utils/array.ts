interface Array<T> {
    uniques(): Array<T>;
    amountOf(item: T): number;
}

interface Array<T extends number | bigint> {
    sum(): T;
    min(): T;
    max(): T;
}


Array.prototype.uniques = function () {
    return this.filter((item, i, arr) => arr.indexOf(item) === i);
};

Array.prototype.sum = function () {
    return typeof this[0] === "bigint" ? this.reduce((a, b) => a + b, 0n) : this.reduce((a, b) => a + b, 0);
};

Array.prototype.min = function () {
    return Math.min(...this);
};

Array.prototype.max = function () {
    return Math.max(...this);
};

Array.prototype.amountOf = function (item): number {
    return this.filter(el => el === item).length;
};