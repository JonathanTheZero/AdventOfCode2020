import type { direction, turnDirection } from "./definitions";

export function isDirection(val: string): val is direction {
    return ["N", "S", "W", "E"].includes(val);
} 

export function isTurnDirection(val: string): val is turnDirection {
    return ["R", "L"].includes(val);
}