import "../utils/string";

/**
 * not really needed but I thought I'll just stick with the OOP approach for this day
 */
export default class Seamonster {
    look: string[];

    constructor(private _str: string) {
        this.look = _str.replaceAll(" ", ".").split("\n");
    }

    get clearLook(): string[] {
        return this.look.map(e => e.replaceAll(".", " "));
    }

    get regEx() {
        let str = this.look[0] + "(.)+\n";
        for (let i = 1; i < this.look.length - 1; ++i) {
            str += "(.)*" + this.look[i] + "(.)+\n";
        }
        str += "(.)*" + this.look[this.look.length - 1];

        return new RegExp(str, "g");
    }

    public toString() {
        return this._str;
    }
}