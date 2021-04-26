"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_class_1 = __importDefault(require("./food.class"));
class FoodCluster {
    constructor(foodLines) {
        this.foods = [];
        for (const line of foodLines) {
            let [ingr, all] = line.split(" (contains ");
            all = all.slice(0, -1);
            let ingredients = ingr.split(" "), allergens = all.split(" ");
            this.foods.push(new food_class_1.default());
        }
    }
}
exports.default = FoodCluster;
