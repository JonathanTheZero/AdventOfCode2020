interface Array<T> {
    uniques(): Array<T>;
}

Array.prototype.uniques = function(){
    return this.filter((item, i, arr) => arr.indexOf(item) === i);
}