import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rememberMe: boolean = false;
  email: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private storage: Storage, private alert: AlertProvider) {
  }

  ionViewDidLoad() {
    this.storage.get("rememberMe").then(remember => {
      this.rememberMe = remember;
      if (remember == true) {
        this.storage.get("email").then(result => {
          if (result) {
            this.email = result;
            this.storage.get("password").then(pass => {
              if (pass) {
                this.password = pass;
              }
            });
          }
        });
      }
    });
  }

  rememberMeChanged() {
    this.storage.set("rememberMe", this.rememberMe);
    if (this.rememberMe) {
      this.storage.set("email", this.email);
      this.storage.set("password", this.password);
    }
    else {
      this.storage.set("email", "");
      this.storage.set("password", "");
    }
  }

  doLogin() {
    if (this.validateInputs()) {
      this.httpCall.get(this.globals.servicesURL.login, "?Email=" + this.email + "&Password=" + this.password).subscribe(result => {
        this.globals.isUserLoggedIn = true;
        this.globals.userId = result;
        this.rememberMeChanged();
        this.navCtrl.setRoot("LandingPage");
      });
    }
  }

  forgetPassword() {
    this.navCtrl.push("ForgetPasswordPage");
  }

  openRegister() {
    this.navCtrl.push("RegisterFormPage");
  }

  validateInputs() {
    if (this.email == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.email");
      return false;
    }
    else if (!this.globals.validateEmail(this.email)) {
      this.alert.displayErrorToast("register.email-error");
      return false;
    }
    else if (this.password == '') {
      this.alert.displayErrorToast2("general.please", "general.enter", "register.password");
      return false;
    }

    return true;
  }
}
