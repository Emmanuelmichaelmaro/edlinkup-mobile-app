import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonicPage, NavParams } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { ConnectPage } from '../connect/connect';
import { HomePage } from '../home/home';
import { MessagePage } from "../message/message";
import { NotificationPage } from "../notification/notification";
import { ApiProvider } from '../../providers/api/api';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    NotificationStatus:any = '';
    MessageStatus:any = '';

    public hideTabs:boolean = true;

    // tab1Root = HomePage;
    // tab2Root = AccountPage;
    // tab3Root = ConnectPage;
    // tab4Root = NotificationPage;
    // tab5Root = MessagePage;

    tab1Root: any = 'HomePage';
    tab2Root: any = 'AccountPage';
    tab3Root: any = 'ConnectPage';
    tab4Root: any = 'NotificationPage';
    tab5Root: any = 'MessagePage';
    
    myIndex: number;

    constructor (public Api: ApiProvider, public http: Http, public storage: Storage, navParams: NavParams) {
        this.storage.get('iduser').then((val) => {
            this.http.get(this.Api.ApiPath + '=get_notification_status&x1=' + val)
            .map(res => res.json())
            .subscribe(data => {
                this.MessageStatus = data.message;
                this.NotificationStatus = data.notification;
            });		
        }); 
        
        // Set the active tab based on the passed index from menu.ts
        this.myIndex = navParams.data.tabIndex || 0;
    }

}
