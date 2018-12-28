import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyPage } from './privacy';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    PrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class PrivacyPageModule {}
