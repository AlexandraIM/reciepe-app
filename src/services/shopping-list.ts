
import { Ingredient } from "../models/ingerdients";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { AuthService } from "./auth";
import { Observable } from "rxjs/Observable";
import { map } from 'rxjs/operators';

@Injectable()
export class ShoppingListService {
    private dbURL = 'https://recipebook-fbcc9.firebaseio.com/';
    constructor(private http : HttpClient, private authService: AuthService){}

    private ingredients : Ingredient[] = [];

    addIngredient(ingredient: Ingredient){
        if(ingredient){
            this.ingredients.push(ingredient);
        }
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

    storeList(token: string){
        const userId = this.authService.getActiveUser().uid;
        return this.http.put(this.dbURL + userId + '/shopping-list.json?auth=' + token,
        this.ingredients);
    }

    fetchList(token: string) : Observable<Ingredient[]>{
        const userId = this.authService.getActiveUser().uid;
        return this.http.get<Ingredient[]>(this.dbURL + userId + '/shopping-list.json?auth=' + token)
            .pipe(
                map(data => {
                    this.ingredients = data;
                    return data;
                })
            );
    }
}