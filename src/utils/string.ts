interface String {
	replaceAll(str: string, replace: string): string;
	replaceAt(index: number, replacement: string): string;
	containsAny(...values: string[]): boolean;
	amountOf(item: string): number;
}


//Replace all polyfill
if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function (str: string | RegExp, newStr: string) {
		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);
	};
}

String.prototype.containsAny = function (...values: string[]) {
	return values.some(el => this.includes(el));
};

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + 1);
};

String.prototype.amountOf = function (item: string): number {
    let result = 0;
    for (let i of this)
        if (i === item) result++;
    return result;
};