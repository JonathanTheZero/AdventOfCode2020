import type { directions } from "./utilTypes";

export function oppositeDirection(direction: directions): directions {
    switch (direction) {
        case "bottom":
            return "top";
        case "left":
            return "right";
        case "right":
            return "left";
        case "top":
            return "bottom";
    }
}