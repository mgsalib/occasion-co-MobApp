import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterConfirmPage } from './register-confirm';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    RegisterConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterConfirmPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RegisterConfirmPageModule { }
