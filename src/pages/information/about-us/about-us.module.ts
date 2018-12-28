import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutUsPage } from './about-us';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    AboutUsPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutUsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class AboutUsPageModule {}
