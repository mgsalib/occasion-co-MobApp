import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CategoriesPageModule { }
