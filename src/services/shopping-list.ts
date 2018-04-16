
import { Ingredient } from "../models/ingerdients";

export class ShoppingListService {
    private ingredients : Ingredient[] = [];

    addIngredient(ingredient: Ingredient){
        if(ingredient){
            this.ingredients.push(ingredient);
        }
        console.log(this.ingredients);
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }

    removeIngredient(index: number){
        this.ingredients.splice(index,1);
    }

    getIngredients(){
        return this.ingredients.slice();
    }
}