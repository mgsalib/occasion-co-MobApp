import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider } from "../../providers/providers";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  products: any = [];
  marketDetails: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider) {
    this.marketDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    this.httpCall.get(this.globals.servicesURL.products, "?MarketId=" + this.marketDetails.marketId).subscribe(result => {
      this.products = result;
    });
  }
}
