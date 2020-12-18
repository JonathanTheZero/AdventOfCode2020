export type ticketKeys =
    | "departure location"
    | "departure station"
    | "departure platform"
    | "departure track"
    | "departure date"
    | "departure time"
    | "arrival location"
    | "arrival station"
    | "arrival platform"
    | "arrival track"
    | "class"
    | "duration"
    | "price"
    | "route"
    | "row"
    | "seat"
    | "train"
    | "type"
    | "wagon"
    | "zone";


export type _data = [
    [number, number],
    [number, number]
];


export type ticketRestrictions = {
    [K in ticketKeys]: _data;
}