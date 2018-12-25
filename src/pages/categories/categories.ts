import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, alertFields, AlertProvider, ConfigClass } from "../../providers/providers";
import { Geolocation } from '@ionic-native/geolocation';

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
  countries: any = [];
  imagePath: string = ConfigClass.getImagesPath;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private geolocation: Geolocation) {
    this.categoryDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    this.httpCall.get(this.globals.servicesURL.markets, "?CategoryId=" + this.categoryDetails.categoryId).subscribe(result => {
      this.markets = result;
    });
    this.getCountries();
  }

  // open product details
  openProducts(market) {
    this.navCtrl.push("ProductPage", market);
  }

  getCountries() {
    this.httpCall.get(this.globals.servicesURL.countries).subscribe(result => {
      this.countries = result;
    });
  }

  countryChanged(evt) {
    // evt.value[0].countryCode;
    this.httpCall.get(this.globals.servicesURL.markets, "?CategoryId=" + this.categoryDetails.categoryId).subscribe(result => {
      this.markets = result;
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
