import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider, ConfigClass } from "../../providers/providers";

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  getImagePath() {
    if (this.globals.userInfo.imageFile != null) {
      if (this.globals.userInfo.imageFile.indexOf("graph.facebook") > -1) {
        return this.globals.userInfo.imageFile;
      }
      else {
        return ConfigClass.getImagesPath + this.globals.userInfo.imageFile;
      }
    }
    else {
      return "assets/imgs/user-image.svg";
    }
  }
}
