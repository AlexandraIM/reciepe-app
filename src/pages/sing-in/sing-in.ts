import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-sing-in',
  templateUrl: 'sing-in.html',
})
export class SingInPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
            private alertCtrl: AlertController) {
  }

  onSingin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Singing ...'
    });

    loading.present();
    this.authService.singin(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signin failed!',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
    })
  }

}
