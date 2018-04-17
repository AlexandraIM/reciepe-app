import { Recipe } from './../models/recipe';
export class RecipesService {
    private recipes: Recipe[] = [];

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
    }

    getRecipe(){
        return this.recipes.slice();
    }

    updateRecipe(index: number, recipe : Recipe){
        this.recipes[index] = recipe;
    }

    removeRecipe(index: number){
        this.recipes.splice(index, 1);
    }
}