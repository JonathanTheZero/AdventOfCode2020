import type { ticketKeys, ticketRestrictions, _data } from "./definitions";


export default function loadDict(chunk: string): ticketRestrictions {
    const dict: Partial<ticketRestrictions> = {};

    for (let str of chunk.split("\r\n")) {
        let [key, n] = str.split(":");
        
        let nums = n.trim().split(" or ").map(el => el.split("-").map(Number)) as _data;
        dict[key as ticketKeys] = nums;
    }

    return dict as ticketRestrictions;
}