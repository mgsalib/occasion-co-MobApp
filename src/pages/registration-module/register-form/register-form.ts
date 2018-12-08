import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";

/**
 * Generated class for the RegisterFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-form',
  templateUrl: 'register-form.html',
})
export class RegisterFormPage {

  username: string = "";
  password: string = "";
  rePassword: string = "";
  phone: string = "";
  email: string = "";
  firstname: string = "";
  lastname: string = "";
  mobile: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private alert: AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterFormPage');
  }

  openConfirmRegister() {
    this.navCtrl.push("RegisterConfirmPage");
  }

  register() {
    if (this.validateInputs()) {
      var data = "UserName=" + this.username + "&Password=" + this.password + "&Email=" + this.email + "&FirstName=" + this.firstname + "&LastName=" + this.lastname + "&Phone=" + this.phone + "&Mobile=" + this.mobile;
      this.httpCall.post(this.globals.servicesURL.register, "", data).subscribe(result => {
        this.globals.userId = result;
        this.navCtrl.push("LandingPage");
      });
    }
  }

  validateInputs() {
    if (this.username == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.username");
      return false;
    }
    else if (this.password == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.password");
      return false;
    }
    else if (this.rePassword == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.re-password");
      return false;
    }
    else if (this.password != this.rePassword) {
      this.alert.displayErrorToast("register.re-password-error");
      return false;
    }
    else if (this.email == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.email");
      return false;
    }
    else if (!this.globals.validateEmail(this.email)) {
      this.alert.displayErrorToast("register.email-error");
      return false;
    }
    else if (this.mobile == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.mobile");
      return false;
    }
    return true;
  }
}
