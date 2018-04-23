import { DBOptionsPage } from './../db-options/db-options';
import { AuthService } from './../../services/auth';
import { Ingredient } from './../../models/ingerdients';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients : Ingredient[] = [];
  constructor(private shopptingListSrvs : ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
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
              this.shopptingListSrvs.fetchList(token)
              .subscribe(
                (list: Ingredient[]) => {
                  loading.dismiss();
                  if(list){
                    this.ingredients = list;
                  } else {
                    this.ingredients = [];
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
              this.shopptingListSrvs.storeList(token)
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

  private getItems(){
    this.ingredients = this.shopptingListSrvs.getIngredients();
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
