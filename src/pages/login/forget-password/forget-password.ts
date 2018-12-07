import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";

/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  email: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alert: AlertProvider, private httpCall: HttpBaseProvider, private globals: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  reset() {
    if (this.email == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.email");
      return false;
    }
    else if (!this.globals.validateEmail(this.email)) {
      this.alert.displayErrorToast("register.email-error");
      return false;
    }
    else {
      this.httpCall.get(this.globals.servicesURL.forgetPassword, "?UserEmail=" + this.email).subscribe(result => {
        if (result == true) {
          this.alert.displayToast("forget.succ");
          this.navCtrl.pop();
        }
        else {
          this.alert.displayErrorToast("forget.error");
        }
      });
    }
  }
}
