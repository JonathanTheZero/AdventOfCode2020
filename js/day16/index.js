"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const checkIfTicketIsValid_1 = __importDefault(require("./checkIfTicketIsValid"));
const loadDict_1 = __importDefault(require("./loadDict"));
require("../utils/array");
const calculateSeatingOrder_1 = __importDefault(require("./calculateSeatingOrder"));
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    const chunks = data.toString().split("\r\n\r\n");
    const dict = loadDict_1.default(chunks[0]), allTickets = chunks[2].split("\r\n").slice(1), allRanges = [], myTicket = chunks[1].split(":")[1].split(",").map(Number);
    Object.keys(dict).forEach(k => allRanges.push(dict[k]));
    const result = [];
    for (let ticket of allTickets) {
        result.push(...checkIfTicketIsValid_1.default(allRanges, ticket.split(",").map(Number)));
    }
    console.log("Task1:", result.sum());
    const validTickets = [];
    for (let i = 0; i < allTickets.length; ++i) {
        let curr = allTickets[i].split(",").map(Number);
        if (!checkIfTicketIsValid_1.default(allRanges, curr).length) {
            validTickets.push(curr);
        }
    }
    const order = calculateSeatingOrder_1.default(validTickets, chunks[0]);
    let sum = 1;
    for (let i = 0; i < order.length; ++i) {
        let o = order[i];
        if (o.startsWith("departure"))
            sum *= myTicket[i];
    }
    console.log("Task2:", sum);
});
