import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterConfirmPage } from './register-confirm';

@NgModule({
  declarations: [
    RegisterConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterConfirmPage),
  ],
})
export class RegisterConfirmPageModule {}
