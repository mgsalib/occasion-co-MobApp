import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [AppHeaderComponent],
	imports: [IonicModule, TranslateModule.forChild()],
	exports: [AppHeaderComponent, TranslateModule]
})
export class ComponentsModule {}
