import { EditRecipePageModule } from './../edit-recipe/edit-recipe.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesPage } from './recipes';
import { DBOptionsPage } from '../db-options/db-options';

@NgModule({
  declarations: [
    RecipesPage
  ],
  entryComponents: [
    DBOptionsPage
  ],
  imports: [
    EditRecipePageModule,
    IonicPageModule.forChild(RecipesPage),
  ],
})
export class RecipesPageModule {}
