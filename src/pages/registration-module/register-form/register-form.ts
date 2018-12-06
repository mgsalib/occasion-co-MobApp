import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../../providers/providers";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterFormPage');
  }

  openConfirmRegister() {
    this.navCtrl.push("RegisterConfirmPage");
  }

  register() {
    // http://apicoretest.bebrand.tv/api/User/Add?UserName=user&Password=asd&Email=asd&FirstName=asd&LastName=asd
    var data = {
      UserName: this.username,
      Password: this.password,
      Email: this.email,
      FirstName: this.firstname,
      LastName: this.lastname
    };
    this.httpCall.post(this.globals.servicesURL.register, data).subscribe(result => {
      debugger
    });

  }

}
