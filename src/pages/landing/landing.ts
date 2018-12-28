import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpBaseProvider, GlobalProvider, ConfigClass } from "../../providers/providers";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  categories: any = [];
  imagesPath: string = ConfigClass.getImagesPath;
  tempCategories: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.httpCall.get(this.globals.servicesURL.categories).subscribe(result => {
      this.categories = result;
      this.tempCategories = result;
    });
  }

  // open categories page function
  openProducts(item) {
    this.navCtrl.push("CategoriesPage", item);
  }

  filterItems(ev: any) {
    let val = ev.target.value;
    this.categories = this.tempCategories;
    if (val && val.trim() != '') {
      this.categories = this.categories.filter(item => {
        return ((item.title != null && item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.description != null && item.description.toLowerCase().indexOf(val.toLowerCase()) > -1));
      });
    }
  }
}
