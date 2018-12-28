import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpBaseProvider, InterceptorProvider, AlertProvider, GlobalProvider, TranslateProvider, SocialProvider } from '../providers/providers';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MediaCapture } from '@ionic-native/media-capture';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileTransfer } from '@ionic-native/file-transfer';
import { IonicSelectableModule } from 'ionic-selectable';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { StarRatingModule } from 'ionic3-star-rating';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: "ios"
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    IonicSelectableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpBaseProvider,
    InterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true
    },
    AlertProvider,
    GlobalProvider,
    TranslateProvider,
    MediaCapture,
    AndroidPermissions,
    FileTransfer,
    SocialProvider,
    Facebook,
    Geolocation,
    CallNumber
  ]
})
export class AppModule { }
