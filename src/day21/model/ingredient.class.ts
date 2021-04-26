import type { Nullable } from "../../utils/utilTypes";

export default class Ingredient {
    public allergen: Nullable<string> = undefined;
    
    constructor(public name: string) { }
}