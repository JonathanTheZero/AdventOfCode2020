"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ship_class_1 = __importDefault(require("./ship.class"));
const utils_1 = require("./utils");
fs_1.default.readFile("./data.txt", (err, data) => {
    if (err)
        throw err;
    let instructions = data.toString().split("\r\n");
    let ship = new ship_class_1.default();
    for (let instruction of instructions) {
        let key = instruction[0], value = Number(instruction.slice(1));
        if (utils_1.isDirection(key)) {
            ship.move(value, key);
        }
        else if (utils_1.isTurnDirection(key)) {
            ship.turn(key, value);
        }
        else if (key === "F") {
            ship.move(value);
        }
    }
    console.log("Task1:", ship.coordinates, Math.abs(ship.coordinates[0]) + Math.abs(ship.coordinates[1]));
    ship = new ship_class_1.default();
    for (let instruction of instructions) {
        let key = instruction[0], value = Number(instruction.slice(1));
        if (utils_1.isDirection(key)) {
            ship.waypoint.move(value, key);
        }
        else if (utils_1.isTurnDirection(key)) {
            ship.waypoint.turnAround(key, value);
        }
        else if (key === "F") {
            ship.moveTowardsWaypoint(value);
        }
    }
    console.log("Task2", ship.coordinates, Math.abs(ship.coordinates[0]) + Math.abs(ship.coordinates[1]));
});
