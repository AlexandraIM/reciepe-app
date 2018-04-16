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
     private toastCtrl: ToastController) {}

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    this.initializeForm();
  }

  private initializeForm(){
    this.recipieForm = this.fb.group({
      'title' : [null, Validators.required],
      'description': [null, Validators.required],
      'difficulty' : ["Medium", Validators.required],
      'ingredients': this.fb.array([this.createIngredient()])
    })
  }

  private createIngredient() : FormGroup {
    return this.fb.group({
      name: '',
      quantity : ''
    })
  }

  onSubmit(){
    console.log(this.recipieForm);
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
            const fArray: FormArray = <FromArray>this.recipieForm.get('ingredients');
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
          name: 'quantity',
          placeholder: 'Quantity'
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
              name : data.name,
              quantity : data.quantity
            }))
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
