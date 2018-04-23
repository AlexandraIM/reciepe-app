import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sing-up',
  templateUrl: 'sing-up.html',
})
export class SingUpPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  onSingup(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Singing you up..'
    });

    loading.present();
    this.authService.singup(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signup faild',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    })
  }
}
