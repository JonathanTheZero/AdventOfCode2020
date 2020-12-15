"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTurnDirection = exports.isDirection = void 0;
function isDirection(val) {
    return ["N", "S", "W", "E"].includes(val);
}
exports.isDirection = isDirection;
function isTurnDirection(val) {
    return ["R", "L"].includes(val);
}
exports.isTurnDirection = isTurnDirection;
