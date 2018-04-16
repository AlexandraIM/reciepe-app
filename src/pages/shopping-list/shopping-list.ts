import { Ingredient } from './../../models/ingerdients';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients : Ingredient[] = [];
  constructor(private shopptingListSrvs : ShoppingListService) {
  }

  onAddItem(form: NgForm){
    this.shopptingListSrvs.addIngredient(form.value);
    form.reset();
    this.getItems();
  }

  ionViewWillEnter(){
    this.getItems();
  }

  onRemove(index: number){
    this.shopptingListSrvs.removeIngredient(index);
    this.getItems();
  }

  private getItems(){
    this.ingredients = this.shopptingListSrvs.getIngredients();
  }
}
