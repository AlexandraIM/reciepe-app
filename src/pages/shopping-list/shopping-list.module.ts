import { DBOptionsPage } from './../db-options/db-options';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';

@NgModule({
  declarations: [
    ShoppingListPage
  ],
  entryComponents:[
    DBOptionsPage
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage),
  ],
})
export class ShoppingListPageModule {}
