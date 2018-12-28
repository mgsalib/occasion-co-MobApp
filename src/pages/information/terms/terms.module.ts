import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPage } from './terms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TermsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class TermsPageModule { }
