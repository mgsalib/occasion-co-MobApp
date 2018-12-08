import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  public isUserLoggedIn: boolean = false;
  public accessToken: string = "";
  public userId: string = "";

  public servicesURL: any = {
    login: {
      url: "User/AuthenticateUser"
    },
    register:
    {
      url: "User/Add?"
    },
    forgetPassword: {
      url: "User/ForgetPassword"
    }
  }
  constructor()
  { }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true);
    }
    return (false);
  }
}
