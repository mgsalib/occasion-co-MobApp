import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider, ConfigClass } from "../../providers/providers";
import { Storage } from '@ionic/storage';

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
  allPrices: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private globals: GlobalProvider, private storage: Storage) {
  }

  ionViewDidEnter() {
    this.calculatePrice();
  }

  add(index) {
    this.globals.shoppingCart[index].amount += 1;
    this.allPrices += Number(this.globals.shoppingCart[index].price);
    this.storage.set("shoppingCart", this.globals.shoppingCart);
  }

  remove(index) {
    if (this.globals.shoppingCart[index].amount > 0) {
      this.globals.shoppingCart[index].amount -= 1;
      this.allPrices -= Number(this.globals.shoppingCart[index].price);
      this.storage.set("shoppingCart", this.globals.shoppingCart);
    }
  }

  removeItem(index) {
    this.allPrices -= this.globals.shoppingCart[index].price * this.globals.shoppingCart[index].amount;
    this.globals.shoppingCart.splice(index, 1);
    this.storage.set("shoppingCart", this.globals.shoppingCart);
  }

  calculatePrice() {
    this.allPrices = 0;
    for (var i = 0; i < this.globals.shoppingCart.length; i++) {
      this.allPrices += this.globals.shoppingCart[i].price * this.globals.shoppingCart[i].amount;
    }
  }

  pay() {
    if (this.globals.isUserLoggedIn)
    { }
    else {
      this.navCtrl.push("LoginPage", { fromCart: true });
    }
  }
}
