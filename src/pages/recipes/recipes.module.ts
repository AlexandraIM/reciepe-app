import { EditRecipePageModule } from './../edit-recipe/edit-recipe.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesPage } from './recipes';

@NgModule({
  declarations: [
    RecipesPage,
  ],
  imports: [
    EditRecipePageModule,
    IonicPageModule.forChild(RecipesPage),
  ],
})
export class RecipesPageModule {}
