import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { NotificationpostPage } from "../notificationpost/notificationpost";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-notification',
	templateUrl: 'notification.html',
})

export class NotificationPage {
	notification:any=new Array();

	imgadd: string =this.Api.imgadd;
	imgaddlogo: string =this.Api.imgaddlogo;
	
	constructor(public navCtrl: NavController,public Api:ApiProvider, public http:Http,public storage: Storage, public navParams: NavParams) {
		this.storage.get('iduser').then((val) => {
			let link =this.Api.ApiPath+"=notification&x1="+val;
			this.http.get(link).map(res => res.json())
				.subscribe(data => {
					//console.log(data);
					this.notification=data;
				});
		});

		this.clearnotification();
	}

	clearnotification() {
		console.log("okkkkkk");
		this.storage.get('iduser').then((val) => {
			this.http.get(this.Api.ApiPath+'=get_notification_status_clear&x1='+val).map(res=> res.json())
				.subscribe(data => {
					//this.NotificationStatus='';
				});		
		});
	}	

	posts(x){
		console.log(x);
		this.navCtrl.push(NotificationpostPage,{data:x});
	}

	userphoto(x) {
		if((x=='')||(x==null)||(x=='undefined')){
			return 'images/noimage.jpg'; 
		} else {
			return x;  
		}
	}
}
