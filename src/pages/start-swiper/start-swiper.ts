import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../providers/providers";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the StartSwiperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start-swiper',
  templateUrl: 'start-swiper.html',
})
export class StartSwiperPage {

  countries: any = [];
  currencies: any = [];
  selectedCurrency: any = "";
  selectedCountry: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.getCountries();
    this.getCurrencies();
  }


  getCountries() {
    this.httpCall.get(this.globals.servicesURL.countries).subscribe(result => {
      this.countries = result;
    });
  }

  getCurrencies() {
    this.httpCall.get(this.globals.servicesURL.currencies).subscribe(result => {
      this.currencies = result;
    });
  }

  start() {
    this.storage.set("openLanding", true);
    this.globals.userSettings.selectedCountry = this.selectedCountry;
    this.globals.userSettings.selectedCurrency = this.selectedCurrency;
    this.storage.set("userSettings",  this.globals.userSettings);
    this.navCtrl.push("LandingPage");
  }
}
