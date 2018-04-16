import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipePage } from './../recipe/recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addNewRecepie(){
    this.navCtrl.push(EditRecipePage, {mode: "New"});
  }
}
