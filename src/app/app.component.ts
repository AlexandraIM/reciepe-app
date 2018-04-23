import { AuthService } from './../services/auth';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SingInPage } from '../pages/sing-in/sing-in';
import { SingUpPage } from '../pages/sing-up/sing-up';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  singInPage: any = SingInPage;
  singUpPage: any = SingUpPage;
  isAuthenticated = false;
  @ViewChild('nav') nav : NavController;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyCdVxaWxkU0jPBZeTGwx7VO5uYj2h-DltQ",
      authDomain: "recipebook-fbcc9.firebaseapp.com"
    });

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.singInPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut(){
    this.authService.logout();
    this.menuCtrl.close();
  }
}

