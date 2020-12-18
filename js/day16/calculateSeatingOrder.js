"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const possibleKeys = [
    "departure location",
    "departure station",
    "departure platform",
    "departure track",
    "departure date",
    "departure time",
    "arrival location",
    "arrival station",
    "arrival platform",
    "arrival track",
    "class",
    "duration",
    "price",
    "route",
    "row",
    "seat",
    "train",
    "type",
    "wagon",
    "zone"
];
function calculateSeatingOrder(nums, fields) {
    const allValid = new Set();
    const fieldsValid = fields
        .split('\n')
        .map(f => { var _a; return (_a = f.match(/\d+-\d+/g)) === null || _a === void 0 ? void 0 : _a.reduce((a, v) => {
        let [start, end] = v.split('-').map(a => parseInt(a));
        for (let j = start; j <= end; j++) {
            a.add(j);
            allValid.add(j);
        }
        return a;
    }, new Set()); });
    let entrysOptions = [];
    for (let entryNum = 0; entryNum < nums[0].length; entryNum++) {
        let couldBe = new Set(possibleKeys);
        for (let ticketNum = 0; ticketNum < nums.length; ticketNum++) {
            fieldsValid.forEach((field, i) => {
                if (!(field === null || field === void 0 ? void 0 : field.has(nums[ticketNum][entryNum]))) {
                    couldBe.delete(possibleKeys[i]);
                }
            });
        }
        entrysOptions.push(couldBe);
    }
    let found = [], amtFound = 0;
    while (amtFound < possibleKeys.length) {
        entrysOptions.forEach((options, i) => {
            if (options.size == 1) {
                let fieldName = options.values().next().value;
                entrysOptions.forEach(allOptions => { allOptions.delete(fieldName); });
                found[i] = fieldName;
                amtFound++;
            }
        });
    }
    return found;
}
exports.default = calculateSeatingOrder;
