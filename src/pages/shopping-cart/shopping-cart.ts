import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider, ConfigClass } from "../../providers/providers";

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  PaymentSteps: string = "order-list";
  imagePath: string = ConfigClass.getImagesPath;

  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  add(index) {
    this.globals.shoppingCart[index].amount += 1;
  }

  remove(index) {
    if (this.globals.shoppingCart[index].amount > 0) {
      this.globals.shoppingCart[index].amount -= 1;
    }
  }

  removeItem(index) {
    this.globals.shoppingCart.splice(index, 1);
  }
}
