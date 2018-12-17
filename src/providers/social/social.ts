import { Injectable } from "@angular/core";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Events } from 'ionic-angular';
import { AlertProvider } from "../alert/alert";

@Injectable()
export class SocialProvider {

  constructor(private event: Events, private fb: Facebook, private alert: AlertProvider) {
  }

  openFB() {
    this.alert.displayLoadingSpinner();
    return new Promise((resolve, reject) => {
      this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          var userId = res.authResponse.userID;
          this.fb.api("/me?fields=email,first_name,last_name,id", ["public_profile", "email"]).then(result => {
            this.alert.dismissLoadingSpinner();
            resolve(result);
          });
        })
        .catch(e => {
          this.alert.dismissLoadingSpinner();
          reject(false);
        });
    });
  }
}