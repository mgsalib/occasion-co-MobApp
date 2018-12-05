import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterFormPage } from './RegisterFormPage';

@NgModule({
  declarations: [
    RegisterFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterFormPage),
  ],
})
export class RegisterPageModule {}
