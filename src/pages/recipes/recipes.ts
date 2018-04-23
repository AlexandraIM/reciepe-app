import { DBOptionsPage } from './../db-options/db-options';

import { AuthService } from './../../services/auth';
import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipePage } from './../recipe/recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, AlertController } from 'ionic-angular';

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
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private alertCtrl : AlertController) {
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

  onShowOptions(event: MouseEvent){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    const popover = this.popoverCtrl.create(DBOptionsPage);
    popover.present({
      ev:event
    });
    popover.onDidDismiss(
      data => {
        if(!data){
          return;
        }
        if(data.action == 'load'){
          loading.present();
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesService.fetchRecipes(token)
              .subscribe(
                (list: Recipe[]) => {
                  loading.dismiss();
                  if(list){
                    this.recepies = list;
                  } else {
                    this.recepies = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().message);
                }
              )
            }
          )
          .catch();
        } else if (data.action == 'store'){
          loading.present
          this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesService.storeRecipes(token)
              .subscribe(
                () => {
                  loading.dismiss();
                  console.log('Siccess!')
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().message);
                }
              )
            }
          )
          .catch();
        }
      }
    )
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'Error!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
