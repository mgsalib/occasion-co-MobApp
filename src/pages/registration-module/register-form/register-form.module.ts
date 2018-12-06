import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterFormPage } from './register-form';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  declarations: [
    RegisterFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterFormPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RegisterFormPageModule { }
