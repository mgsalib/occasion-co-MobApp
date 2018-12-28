import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    TranslateModule.forChild(),
    ComponentsModule,
    StarRatingModule
  ],
})
export class ProductPageModule { }
