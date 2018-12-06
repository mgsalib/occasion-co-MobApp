import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";
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
  email: string = "systemadmin@kmk.com";
  password: string = "systemadmin";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private storage: Storage) {
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
                this.rememberMe = true;
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
    this.httpCall.get(this.globals.servicesURL.login, "?Email=" + this.email + "&Password=" + this.password).subscribe(result => {
      if (result.success) {
        this.globals.isUserLoggedIn = true;
        this.globals.accessToken = result.data.token;
        this.rememberMeChanged();
        this.navCtrl.setRoot("HomePage");
      }
    });
  }

  forgetPassword() {
    this.navCtrl.push("ForgetPasswordPage");
  }

  openRegister() {
    this.navCtrl.push("RegisterFormPage");
  }
}
