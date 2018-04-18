import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipePage } from './../recipe/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage{
  recepies : Recipe[] = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private recipesService: RecipesService,
    private modalCtrl: ModalController) {
  }

  addNewRecepie(){
    this.navCtrl.push(EditRecipePage, {mode: "New"});
  }

  ionViewWillEnter(){
    this.recepies = this.recipesService.getRecipe();
  }

  openRecipe(index: number, recipe: Recipe){
    this.navCtrl.push(RecipePage, {
      index: index, recipe : recipe
    });
  }
}
