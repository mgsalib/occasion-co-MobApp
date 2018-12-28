import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, AlertProvider } from "../../../providers/providers";
import { Storage } from '@ionic/storage';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { AndroidPermissions } from '@ionic-native/android-permissions';

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
  mediaSelected: boolean = false;
  mediaFile: any = {};
  photo: string = "assets/imgs/user-image.svg";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private alert: AlertProvider, private storage: Storage, private mediaCapture: MediaCapture,
    private androidPermissions: AndroidPermissions) {
    if (this.navParams.data != undefined && this.navParams.data != null && this.navParams.data.first_name != undefined) {
      this.username = this.navParams.data.first_name + " " + this.navParams.data.last_name;
      this.firstname = this.navParams.data.first_name;
      this.lastname = this.navParams.data.last_name;
      this.email = this.navParams.data.email;
      this.photo = "https://graph.facebook.com/" + this.navParams.data.id + "/picture";
    }
  }

  openConfirmRegister() {
    this.navCtrl.push("RegisterConfirmPage");
  }

  register() {
    if (this.validateInputs()) {
      if (this.mediaSelected) {
        this.httpCall.uploadAttachment(this.mediaFile).then(result => {
          this.doRegister(result);
        });
      }
      else {
        this.doRegister(this.photo);
      }
    }
  }

  doRegister(image) {
    if (image.indexOf("assets") > -1) {
      image = "";
    }
    var data = "UserName=" + this.username + "&Password=" + this.password + "&Email=" + this.email + "&FirstName=" + this.firstname + "&LastName=" + this.lastname +
      "&Phone=" + this.phone + "&Mobile=" + this.mobile + "&ImageFile=" + image;
    this.httpCall.post(this.globals.servicesURL.register, "", data).subscribe(result => {
      this.globals.userId = result;
      this.storage.set("userId_occ", result);
      this.httpCall.get(this.globals.servicesURL.user_details, "UserId=" + result).subscribe(info => {
        this.globals.userInfo = info;
        this.storage.set("userInfo_occ", info);
        this.globals.isUserLoggedIn = true;
        this.navCtrl.push("LandingPage");
      });
    });
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

  capture() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => {
        if (result.hasPermission) {
          this.doCapture();
        }
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => {
            if (result.hasPermission) {
              this.doCapture();
            }
          });
        }
      },
      err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(result => {
          if (result.hasPermission) {
            this.doCapture();
          }
        });
      }
    );
  }

  doCapture() {
    this.mediaCapture.captureImage()
      .then((data: MediaFile[]) => {
        this.mediaSelected = true;
        this.mediaFile = data[0];
        this.photo = this.mediaFile.fullPath;
      },
      (err: CaptureError) => console.error(err)
      );
  }

}
