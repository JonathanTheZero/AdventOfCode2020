export default function mapIngredients(foodLines: string[]): Map<string, string> {
    let possibleIngredients = new Map<string, string[][]>(),  //possible allergens
        map = new Map<string, string>();

    for (const line of foodLines) {
        let [ingr, all] = line.split(" (contains ");
        all = all.slice(0, -1);
        let ingredients = ingr.split(" "),
            allergens = all.split(" ");

        for (const _in of ingredients) {
            if (possibleIngredients.get(_in))
                possibleIngredients.get(_in)!.push(allergens);
            else
                possibleIngredients.set(_in, [allergens]);
        }
    }

    console.log(possibleIngredients);

    return map;
}