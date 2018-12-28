import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ContactPageModule {}
