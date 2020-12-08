interface String {
	replaceAll(str: string, replace: string): string;
	containsAny(...values: string[]): boolean;
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
}