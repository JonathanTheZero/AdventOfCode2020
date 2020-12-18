//Solved using partial code from this Reddit comment:
//https://www.reddit.com/r/adventofcode/comments/ke2qp6/2020_day_16_solutions/gg26mwk?utm_source=share&utm_medium=web2x&context=3
import type { ticketKeys } from "./definitions";


const possibleKeys: readonly ticketKeys[] = [
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
] as const;


export default function calculateSeatingOrder(nums: number[][], fields: string): ticketKeys[] {
    const allValid = new Set(); // an array of all names that the fields have
    const fieldsValid = fields // an array containing a set of all values within the ranges for each field
        .split('\n')
        .map(f => f.match(/\d+-\d+/g)?.reduce((a, v) => {
            let [start, end] = v.split('-').map(a => parseInt(a));
            for (let j = start; j <= end; j++) {
                a.add(j);
                allValid.add(j);
            }
            return a;
        }, new Set()));


    let entrysOptions: Set<ticketKeys>[] = [];
    // iterate thru each entry of the valid tickets
    for (let entryNum = 0; entryNum < nums[0].length; entryNum++) {
        // assume that this entry could be one of any of the fields
        let couldBe = new Set(possibleKeys);
        // for each value this entry has on all the valid tickets
        for (let ticketNum = 0; ticketNum < nums.length; ticketNum++) {
            // if any value doesn't fit into a field, this entry cannot be that field.
            fieldsValid.forEach((field, i) => {
                if (!field?.has(nums[ticketNum][entryNum])) {
                    couldBe.delete(possibleKeys[i]);
                }
            })
        }
        // keep track of the possibilities for each entry
        entrysOptions.push(couldBe);
    }

    let found: ticketKeys[] = [],
        amtFound = 0;

    while (amtFound < possibleKeys.length) {
        entrysOptions.forEach((options, i) => {
            // if there is only one possibile field for this entry we know what it is
            if (options.size == 1) {
                let fieldName = options.values().next().value;
                // remove this field as a possibility for every other entry
                entrysOptions.forEach(allOptions => { allOptions.delete(fieldName) });
                // remember which entry correlates to which field
                found[i] = fieldName;
                amtFound++;
            }
        })
    }

    return found;
}