import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider, GlobalProvider, TranslateProvider, HttpBaseProvider, alertFields, alertOption, ConfigClass } from "../providers/providers";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "StartSwiperPage";
  countries: any = [];
  currencies: any = [];

  constructor(private platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen, private translate: TranslateService,
    private globals: GlobalProvider, private storage: Storage,
    private langService: TranslateProvider, private httpCall: HttpBaseProvider,
    private alert: AlertProvider, private events: Events) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("openLanding").then(result => {
        if (result == true) {
          this.rootPage = "LandingPage";
          this.storage.get("userSettings").then(result => {
            this.globals.userSettings.selectedCountry = result.selectedCountry;
            this.globals.userSettings.selectedCurrency = result.selectedCurrency;
            this.globals.userSettings.selectedCity = result.selectedCity;
          });
        }
        else {
          this.rootPage = "StartSwiperPage";
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang("en");
      // this.translate.use("en");
      this.langService.useLang();
      this.storage.get("userInfo_occ").then(info => {
        if (info) {
          this.globals.userInfo = info;
          this.globals.isUserLoggedIn = true;
        }
      });

      this.storage.get("shoppingCart").then(result => {
        if (result) {
          this.globals.shoppingCart = result;
        }
      });
    });
  }

  logout() {
    this.globals.isUserLoggedIn = false;
    this.storage.set("userInfo_occ", "");
  }

  getUsername() {
    return this.globals.userInfo.userName;
  }

  getImagePath() {
    if (this.globals.userInfo.imageFile != null) {
      if (this.globals.userInfo.imageFile.indexOf("graph.facebook") > -1) {
        return this.globals.userInfo.imageFile;
      }
      else {
        return ConfigClass.getImagesPath + this.globals.userInfo.imageFile;
      }
    }
    else {
      return "assets/imgs/empty-profile.png";
    }
  }

  changeLang() {
    setTimeout(() => {
      this.langService.changeLang();
    }, 100);
  }

  getCountries() {
    if (this.countries.length < 1) {
      this.httpCall.get(this.globals.servicesURL.countries).subscribe(result => {
        this.countries = result;
        this.displayCountriesDDL();
      });
    }
    else {
      this.displayCountriesDDL();
    }
  }

  displayCountriesDDL() {
    let options: alertOption[] = [];
    for (var i = 0; i < this.countries.length; i++) {
      options.push({
        type: 'radio',
        label: this.countries[i].name,
        value: this.countries[i],
        checked: (this.countries[i].countryCode == this.globals.userSettings.selectedCountry.countryCode) ? true : false
      });
    }

    let alert = new alertFields();
    alert.title = "start.choose-country";
    alert.message = "start.choose-country";
    alert.cancel = "general.cancel";
    alert.ok = "general.ok";
    this.alert.displayOptionAlert(alert, options).then(result => {
      this.globals.userSettings.selectedCountry = result;
      this.globals.userSettings.selectedCity = {
        name: "",
        id: ""
      };
      this.storage.set("userSettings", this.globals.userSettings);
      this.events.publish("cities");
    });
  }

  getCurrencies() {
    if (this.currencies.length < 1) {
      this.httpCall.get(this.globals.servicesURL.currencies).subscribe(result => {
        this.currencies = result;
        this.displayCurreniesDDL();
      });
    }
    else {
      this.displayCurreniesDDL();
    }
  }

  displayCurreniesDDL() {
    let options: alertOption[] = [];
    for (var i = 0; i < this.currencies.length; i++) {
      options.push({
        type: 'radio',
        label: this.currencies[i].name + " - " + this.currencies[i].symbol,
        value: this.currencies[i],
        checked: (this.currencies[i].code == this.globals.userSettings.selectedCurrency.code) ? true : false
      });
    }

    let alert = new alertFields();
    alert.title = "choose-currency";
    alert.message = "choose-currency";
    alert.cancel = "general.cancel";
    alert.ok = "general.ok";
    this.alert.displayOptionAlert(alert, options).then(result => {
      this.globals.userSettings.selectedCurrency = result;
      this.storage.set("userSettings", this.globals.userSettings);
    });
  }

  openPage(pageName) {
    this.nav.setRoot(pageName);
  }
}

