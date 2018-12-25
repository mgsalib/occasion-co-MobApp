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
  savedCategories: any = [];
  imagesPath: string = ConfigClass.getImagesPath;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpCall: HttpBaseProvider, private globals: GlobalProvider, private storage: Storage) {
    this.storage.get("savedCategories").then(result => {
      if (result) {
        this.savedCategories = result;
      }
    });
  }

  ionViewDidLoad() {
    this.httpCall.get(this.globals.servicesURL.categories).subscribe(result => {
      this.categories = result;
    });
  }

  // open categories page function
  openProducts(item) {
    this.navCtrl.push("CategoriesPage", item);
  }

}
