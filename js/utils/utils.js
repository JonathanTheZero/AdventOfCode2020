"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oppositeDirection = void 0;
function oppositeDirection(direction) {
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
exports.oppositeDirection = oppositeDirection;
