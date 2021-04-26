import Food from "./food.class";

export default class FoodCluster {
    foods: Food[] = [];

    constructor(foodLines: string[]) {
        for (const line of foodLines) {
            let [ingr, all] = line.split(" (contains ");
            all = all.slice(0, -1);
            let ingredients = ingr.split(" "),
                allergens = all.split(" ");
            this.foods.push(new Food());
        }

    }
}