import { Recipe } from './../models/recipe';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [];

    private dbURL = 'https://recipebook-fbcc9.firebaseio.com/';
    constructor(private http : HttpClient, private authService: AuthService){}
    
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

    storeRecipes(token: string){
        const userId = this.authService.getActiveUser().uid;

        return this.http.put(this.dbURL + userId + '/recipes-list.json?auth=' + token,
        this.recipes);
    }

    fetchRecipes(token: string) : Observable<Recipe[]>{
        const userId = this.authService.getActiveUser().uid;
        return this.http.get<Recipe[]>(this.dbURL + userId + '/recipes-list.json?auth=' + token)
            .pipe(
                map(data => {
                    const recipes : Recipe[] = data ? data : []; 
                    for(let item of recipes){
                        if(!item.hasOwnProperty('ingredients')){
                            item.ingredients = [];
                        }
                    }
                    this.recipes = recipes;
                    return recipes;
                })
            );
    }
}