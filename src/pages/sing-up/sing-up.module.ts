import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingUpPage } from './sing-up';

@NgModule({
  declarations: [
    SingUpPage,
  ],
  entryComponents: [
    SingUpPage
  ],
  imports: [
    IonicPageModule.forChild(SingUpPage),
  ],
})
export class SingUpPageModule {}
