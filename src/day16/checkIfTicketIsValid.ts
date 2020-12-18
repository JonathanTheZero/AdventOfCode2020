export default function checkIfTicketIsValid(criteria: [number, number][][], nums: number[]): number[] {
    let ret = [];
    for (let num of nums) {
        if (criteria.every(el => (num < el[0][0] || num > el[0][1]) && (num < el[1][0] || num > el[1][1]))) {
            ret.push(num);
        }
    }
    return ret;
}  