"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkIfTicketIsValid(criteria, nums) {
    let ret = [];
    for (let num of nums) {
        if (criteria.every(el => (num < el[0][0] || num > el[0][1]) && (num < el[1][0] || num > el[1][1]))) {
            ret.push(num);
        }
    }
    return ret;
}
exports.default = checkIfTicketIsValid;
