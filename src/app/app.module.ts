import { DBOptionsPage } from './../pages/db-options/db-options';
import { AuthService } from './../services/auth';
import { SingInPageModule } from './../pages/sing-in/sing-in.module';
import { RecipesService } from './../services/recipe';
import { ShoppingListService } from './../services/shopping-list';
import { RecipePageModule } from './../pages/recipe/recipe.module';

import { ShoppingListPageModule } from './../pages/shopping-list/shopping-list.module';
import { RecipesPageModule } from './../pages/recipes/recipes.module';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SingUpPageModule } from '../pages/sing-up/sing-up.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    DBOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RecipesPageModule,
    ShoppingListPageModule,
    RecipePageModule,
    SingInPageModule,
    SingUpPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
