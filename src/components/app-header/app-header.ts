import { Component, Input } from '@angular/core';

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

  constructor() {
  }

}
