import fs from "fs";
import checkIfTicketIsValid from "./checkIfTicketIsValid";
import type { ticketKeys, ticketRestrictions } from "./definitions";
import loadDict from "./loadDict";
import "../utils/array";
import calculateSeatingOrder from "./calculateSeatingOrder";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    const chunks = data.toString().split("\r\n\r\n");

    const dict: ticketRestrictions = loadDict(chunks[0]),
        allTickets = chunks[2].split("\r\n").slice(1),
        allRanges: [number, number][][] = [],
        myTicket = chunks[1].split(":")[1].split(",").map(Number);

    Object.keys(dict).forEach(k => allRanges.push(dict[k as ticketKeys]));

    const result: number[] = [];

    for (let ticket of allTickets) {
        result.push(...checkIfTicketIsValid(allRanges, ticket.split(",").map(Number)));
    }
    console.log("Task1:", result.sum());


    const validTickets = [];
    for (let i = 0; i < allTickets.length; ++i) {
        let curr = allTickets[i].split(",").map(Number);
        if (!checkIfTicketIsValid(allRanges, curr).length) {
            validTickets.push(curr)
        }
    }
    
    const order = calculateSeatingOrder(validTickets, chunks[0]);
    let sum = 1;
    for (let i = 0; i < order.length; ++i) {
        let o = order[i];
        if (o.startsWith("departure")) sum *= myTicket[i];
    }
    console.log("Task2:", sum);
});