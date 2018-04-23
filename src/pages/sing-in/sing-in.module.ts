import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingInPage } from './sing-in';

@NgModule({
  declarations: [
    SingInPage,
  ],
  entryComponents: [
    SingInPage
  ],
  imports: [
    IonicPageModule.forChild(SingInPage),
  ],
})
export class SingInPageModule {}
