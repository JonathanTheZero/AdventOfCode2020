import Seamonster from "./seamonster.class";


/**
 * @returns number of # outside of the monsters possible rooms
 * returns number[] because for some reason, there are several possible matchings
 */
export default function gridMatchMonster(gridStr: string, monster: Seamonster): number[] {
    let gridArr: string[][] = gridStr.split("\n").map(e => e.split("")),
        monsterCharAmount = monster.toString().amountOf("#"),
        ret: number[] = [];

    for (let _ = 0; _ < 2; _++) {
        for (let i = 0; i < 4; ++i) {
            let matchingAmount = gridStr.match(monster.regEx);

            console.log(matchingAmount?.length)
            if (matchingAmount)
                ret.push(gridStr.amountOf("#") - (matchingAmount.length * monsterCharAmount));

            gridArr = gridArr.map((_, i) => gridArr.map(e => e[i]).reverse());
            gridStr = gridArr.map(e => e.join("")).join("\n");
        }
        gridArr = gridArr.map(e => e.reverse());
        gridStr = gridArr.map(e => e.join("")).join("\n");
    }
    return ret;
}