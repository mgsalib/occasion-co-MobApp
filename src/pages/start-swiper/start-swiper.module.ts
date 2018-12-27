import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartSwiperPage } from './start-swiper';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StartSwiperPage,
  ],
  imports: [
    IonicPageModule.forChild(StartSwiperPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class StartSwiperPageModule {}
