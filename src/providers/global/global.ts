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
  public userInfo: any = {};
  public userSettings: any = {
    selectedCountry: {},
    selectedCurrency: {},
    selectedCity: {
      name: "",
      id: ""
    }
  };
  public shoppingCart: any = [];
  
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
    },
    products: {
      url: "Product/GetByMarketId"
    },
    user_details: {
      url: "User/GetById?"
    },
    categories:
    {
      url: "Category/Get"
    },
    markets:
    {
      url: "Market/"
    },
    countries:
    {
      url: "Country/Get"
    },
    markets_By_Loc: {
      url: "Market/GetByCategroyNearMe"
    },
    currencies:
    {
      url: "Currency/Get"
    },
    cities:
    {
      url: "City/GetByCountryID"
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
