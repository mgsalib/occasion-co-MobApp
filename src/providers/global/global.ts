import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  // public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn: boolean = true;
  public accessToken: string = "";
  public activeTab: string = "workspace";

  public servicesURL: any = {
    login: {
      url: "User/AuthenticateUser"
    },
    register:
    {
      url: "User/Add?"
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
