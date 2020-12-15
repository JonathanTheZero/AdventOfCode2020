import fs from "fs";
import type { instructionKey } from "./definitions";
import Ship from "./ship.class";
import { isDirection, isTurnDirection } from "./utils";


fs.readFile("./data.txt", (err, data) => {
    if (err) throw err;
    let instructions = data.toString().split("\r\n");

    let ship = new Ship();

    for (let instruction of instructions) {
        let key = instruction[0] as instructionKey,
            value = Number(instruction.slice(1));
        if (isDirection(key)) {
            ship.move(value, key);
        } else if (isTurnDirection(key)) {
            ship.turn(key, value);
        } else if (key === "F") {
            ship.move(value);
        }
    }

    console.log("Task1:", ship.coordinates, Math.abs(ship.coordinates[0]) + Math.abs(ship.coordinates[1]));

    ship = new Ship();

    for (let instruction of instructions) {
        let key = instruction[0] as instructionKey,
            value = Number(instruction.slice(1));
        
        /*console.log("Waypoint", ship.waypoint.coordinates);
        console.log("Ship:", ship.coordinates);
        console.log();*/

        if (isDirection(key)) {
            ship.waypoint.move(value, key);
        } else if (isTurnDirection(key)) {
            ship.waypoint.turnAround(key, value);
        } else if (key === "F") {
            ship.moveTowardsWaypoint(value);
        }
    }
    console.log("Task2", ship.coordinates, Math.abs(ship.coordinates[0]) + Math.abs(ship.coordinates[1]))
});