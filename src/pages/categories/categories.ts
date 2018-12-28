import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, alertFields, AlertProvider, ConfigClass, alertOption } from "../../providers/providers";
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  markets: any = [];
  categoryDetails: any = {};
  cities: any = [];
  imagePath: string = ConfigClass.getImagesPath;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider,
    private geolocation: Geolocation, private alert: AlertProvider, private storage: Storage, private events: Events) {
    this.categoryDetails = this.navParams.data;
    this.events.unsubscribe("cities");
    this.events.subscribe("cities", (data) => {
      this.cities = [];
    });
  }

  ionViewDidLoad() {
    this.getmarkets();
  }

  getmarkets() {
    if (this.globals.userSettings.selectedCity.id != undefined && this.globals.userSettings.selectedCity.id != '') {
      this.httpCall.get(this.globals.servicesURL.markets, "GetByCityId?CategoryId=" + this.categoryDetails.categoryId + "&CityId=" + this.globals.userSettings.selectedCity.id).subscribe(result => {
        this.markets = result;
      });
    }
    else {
      this.httpCall.get(this.globals.servicesURL.markets, "GetByCategoryId?CategoryId=" + this.categoryDetails.categoryId).subscribe(result => {
        this.markets = result;
      });
    }
  }

  // open product details
  openProducts(market) {
    this.navCtrl.push("ProductPage", market);
  }

  getCities() {
    if (this.cities.length < 1) {
      this.httpCall.get(this.globals.servicesURL.cities, "?CountryID=" + this.globals.userSettings.selectedCountry.id).subscribe(result => {
        this.cities = result;
        this.displayCitiesDDL();
      });
    }
    else {
      this.displayCitiesDDL();
    }
  }

  displayCitiesDDL() {
    let options: alertOption[] = [];
    for (var i = 0; i < this.cities.length; i++) {
      options.push({
        type: 'radio',
        label: this.cities[i].name,
        value: this.cities[i],
        checked: (this.cities[i].id == this.globals.userSettings.selectedCity.id) ? true : false
      });
    }

    let alert = new alertFields();
    alert.title = "prod-info.place";
    alert.message = "prod-info.place";
    alert.cancel = "general.cancel";
    alert.ok = "general.ok";
    this.alert.displayOptionAlert(alert, options).then(result => {
      this.globals.userSettings.selectedCity = result;
      this.storage.set("userSettings", this.globals.userSettings);
      this.getmarkets();
    });
  }

  getByLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.httpCall.get(this.globals.servicesURL.markets, "?CategoryId=" + this.categoryDetails.categoryId + "&Lat=" + resp.coords.latitude + "&Long=" + resp.coords.longitude).subscribe(result => {
        this.markets = result;
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
