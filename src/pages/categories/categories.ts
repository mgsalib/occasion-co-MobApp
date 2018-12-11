import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../providers/providers";

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider) {
    this.categoryDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    this.httpCall.get(this.globals.servicesURL.markets, "?CategoryId=" + this.categoryDetails.categoryId).subscribe(result => {
      this.markets = result;
    });
  }

  // open product details
  openProducts(market) {
    this.navCtrl.push("ProductPage", market);
  }

}
