import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from "../pages/tabs/tabs";

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage:any;

    constructor(platform: Platform, public splashScreen: SplashScreen, statusBar: StatusBar, private storage: Storage) {
        this.storage.get('loginStatus').then((user) => {
            if (user) {

                this.rootPage = TabsPage;

            } else {

                this.rootPage = LoginPage;

            }
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();

            setTimeout(()=>{
                this.splashScreen.hide();
            }, 1000);
        });
    }
}
