import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class FeedbackProvider {
  loader: any;
  alert: any;
  constructor(
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) { }

  presentLoadingSpinner(msg:string = '') {
    this.loader = this.loadingCtrl.create({
      content: msg || "Please wait...",
    });
    this.loader.present();
  }

  dismissLoadingSpinner() {
    this.loader.dismiss();
  }

}
