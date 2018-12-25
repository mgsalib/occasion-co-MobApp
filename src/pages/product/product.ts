import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, ConfigClass } from "../../providers/providers";
import { CallNumber } from '@ionic-native/call-number';

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
  imagePath: string = ConfigClass.getImagesPath;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private callNumber: CallNumber) {
    this.marketDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    this.httpCall.get(this.globals.servicesURL.products, "?MarketId=" + this.marketDetails.marketId).subscribe(result => {
      this.products = result;
    });
  }

  AddToCart() {
    this.navCtrl.push("ShoppingCartPage");
  }

  call(num) {
    this.callNumber.callNumber(num, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  openProductDetails(item) {
    this.navCtrl.push("ProductDetailsPage", item);
  }
}
