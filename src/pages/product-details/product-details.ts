import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigClass, GlobalProvider } from "../../providers/providers";

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  amount: number = 1;
  productDetails: any = {};
  imagePath: string = ConfigClass.getImagesPath;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalProvider) {
    this.productDetails = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }


  addToCart() {
    this.globals.shoppingCart.push({
      amount: this.amount,
      image: this.productDetails.imageFile,
      name: this.productDetails.title,
      price: this.productDetails.price,
      productId: this.productDetails.productId,
      currency: this.productDetails.currency
    });
    this.navCtrl.push("ShoppingCartPage");
  }

  add() {
    this.amount += 1;
  }

  remove() {
    if (this.amount > 0) {
      this.amount -= 1;
    }
  }
}
