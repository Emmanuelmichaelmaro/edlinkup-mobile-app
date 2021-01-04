import { Component, ViewChild } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export interface PageInterface {
    title: string;
    pageName: string;
    tabComponent?: any;
    index?: number;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = 'TabsPage';

    // Reference to the app's root nav
    @ViewChild(Nav) nav: Nav;

    pages: PageInterface[] = [
        { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home' },
        { title: 'Account', pageName: 'TabsPage', tabComponent: 'AccountPage', index: 1, icon: 'contacts' },
        { title: 'Connector', pageName: 'TabsPage', tabComponent: 'ConnectPage', index: 2, icon: 'link' },
        { title: 'Notification', pageName: 'TabsPage', tabComponent: 'NotificationPage', index: 3, icon: 'notifications' },
        { title: 'Message', pageName: 'TabsPage', tabComponent: 'MessagePage', index: 4, icon: 'chatbubbles' },
    ];

    constructor(platform: Platform, public splashScreen: SplashScreen, statusBar: StatusBar, private storage: Storage) {
        this.storage.get('loginStatus').then((user) => {
            if (user) {

                this.rootPage = 'TabsPage';

            } else {

                this.rootPage = 'LoginPage';

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

    openPage(page: PageInterface) {
        let params = {};

        // The index is equal to the order of our tabs inside tabs.ts
        if (page.index) {
            params = { tabIndex: page.index };
        }

        // The active child nav is our Tabs Navigation
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        } else {
            // Tabs are not active, so reset the root page 
            // In this case: moving to or from SpecialPage
            this.nav.setRoot(page.pageName, params);
        }
    }

    isActive(page: PageInterface) {
        // Again the Tabs Navigation
        let childNav = this.nav.getActiveChildNav();

        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            
            return;
        }

        // Fallback needed when there is no active childnav (tabs not active)
        if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
        }
        
        return;
    }
}
