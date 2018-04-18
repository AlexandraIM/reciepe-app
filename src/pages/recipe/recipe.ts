import { ShoppingListService } from './../../services/shopping-list';
import { RecipesService } from './../../services/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from './../../models/recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  recipe: Recipe;
  index: number;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
             private recipesService: RecipesService,
             private slService: ShoppingListService,
             private toastCtrl: ToastController) {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
  }

  addToShoppingList(){
    this.slService.addIngredients(this.recipe.ingredients);
    const toast = this.toastCtrl.create({
      message:'Ingredients added to shopping list!',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

  onEdit(){
   this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onDelete(){
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }
}
