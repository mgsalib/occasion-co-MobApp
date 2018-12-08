import { Component, Input } from '@angular/core';
import { GlobalProvider } from "../../providers/providers";
import { MenuController, NavController } from 'ionic-angular';

/**
 * Generated class for the AppHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  @Input() headerTxt: string = "";

  constructor(private globals: GlobalProvider, private menu: MenuController, private navCtrl: NavController) {
  }

    toggleMenu() {
    this.menu.toggle();
  }

  home() {
    this.navCtrl.setRoot("HomePage");
  }

  cart()
  {}

}
