import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode : string = "New";
  selectOptions = ["Easy", "Medium", "Dificult"];
  recipieForm: FormGroup;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public fb: FormBuilder,
      private actionSheetCtrl: ActionSheetController,
      private alertCtrl: AlertController,
     private toastCtrl: ToastController,
    private recipesService: RecipesService) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    this.initializeForm();
  }

  private initializeForm(){
    this.recipieForm = this.fb.group({
      'title' : [null, Validators.required],
      'description': [null, Validators.required],
      'difficulty' : ["Medium", Validators.required],
      'ingredients': this.fb.array([])
    })
  }

  onSubmit(){
    const value: Recipe = this.recipieForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });

      value.ingredients = ingredients;
    }

    this.recipesService.addRecipe(value);
    this.recipieForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients(){
    const acttionSheet = this.actionSheetCtrl.create({
      title: "What do you want to do?",
      buttons: [
        {
          text: "Add Ingredient",
          handler: () => {
            this.createNewIngredientAlert();
          }
        },
        {
          text: "Remove all Ingredients",
          role: 'destruct',
          handler: () =>{
            const fArray: FormArray = <FormArray>this.recipieForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message:'Ingredients removed',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    acttionSheet.present();
  }

  private createNewIngredientAlert(){
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role:'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null){
              const errorToast = this.toastCtrl.create({
                message: 'Add an ingredient please!',
                duration: 1000,
                position: 'middle'
              });
              errorToast.present();
            }
            (<FormArray>this.recipieForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const addToast = this.toastCtrl.create({
              message: 'Ingredient was added!',
              duration: 1000,
              position: 'middle'
            });
            addToast.present();
          }
        }
      ]
    })
    newIngredientAlert.present();
  }
}
