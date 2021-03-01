"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../utils/string");
class Seamonster {
    constructor(_str) {
        this._str = _str;
        this.look = _str.replaceAll(" ", ".").split("\n");
    }
    get clearLook() {
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
    toString() {
        return this._str;
    }
}
exports.default = Seamonster;
