import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode : string = "New";
  selectOptions = ["Easy", "Medium", "Dificult"];
  recipieForm: FormGroup;
  recipe : Recipe;
  index : number;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public fb: FormBuilder,
      private actionSheetCtrl: ActionSheetController,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private recipesService: RecipesService) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    if(this.mode === 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
      this.initializeForm();
    
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let item of this.recipe.ingredients){
        ingredients.push(this.fb.group({
          'name' : [item.name, Validators.required],
          'ammount' : [item.ammount, Validators.required]
        }))
      }
    }


    this.recipieForm = this.fb.group({
      'title' : [title, Validators.required],
      'description': [description, Validators.required],
      'difficulty' : [difficulty, Validators.required],
      'ingredients': this.fb.array(ingredients)
    })
  }

  onSubmit(){
    const value: Recipe = this.recipieForm.value;
    if(this.mode === "Edit"){
      this.recipesService.updateRecipe(this.index, this.recipieForm.value)
    } else {
      this.recipesService.addRecipe(value);
    }
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
        },
        {
          name: 'ammount',
          placeholder: 'Ammount'
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
            console.log(data);
            if(data.name.trim() == '' || data.name == null){
              const errorToast = this.toastCtrl.create({
                message: 'Add an ingredient please!',
                duration: 1000,
                position: 'middle'
              });
              errorToast.present();
            }
            (<FormArray>this.recipieForm.get('ingredients'))
              .push(this.fb.group({
                'name' : [data.name, Validators.required],
                'ammount' : [data.ammount, Validators.required]
              }));
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
