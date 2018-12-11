import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider, GlobalProvider } from "../providers/providers";
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LandingPage";
  lastSelectedPage: string = "";

  pages: Array<{ title: string, component: any }>;

  constructor(private platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen, private translate: TranslateService,
    private globals: GlobalProvider, private storage: Storage) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'login.login', component: "LoginPage" }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang("en");
      this.translate.use("en");
      this.storage.get("userInfo_occ").then(info => {
        this.globals.userInfo = info;
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // if (this.lastSelectedPage != page.component) {
    this.lastSelectedPage = page.component;
    this.nav.setRoot(page.component);
    // }
  }

  logout() {
    this.globals.isUserLoggedIn = false;
    this.nav.setRoot("LoginPage");
  }

  getUsername() {
    if (this.globals.userInfo) {
      return this.globals.userInfo.userName;
    }
    else {
      return "";
    }
  }
}

