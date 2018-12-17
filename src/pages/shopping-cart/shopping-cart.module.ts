import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingCartPage } from './shopping-cart';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingCartPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ShoppingCartPageModule {}
