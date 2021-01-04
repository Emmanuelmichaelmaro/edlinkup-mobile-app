import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { MessagepostPage } from "../messagepost/messagepost";
import { SearchUserPage } from "../search-user/search-user";


/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-message',
	templateUrl: 'message.html',
})

export class MessagePage {
	notification:any=new Array();

	imgadd: string =this.Api.imgadd;
	imgaddlogo: string =this.Api.imgaddlogo;
	MessageStatus: string;
	constructor(public navCtrl: NavController,public Api:ApiProvider, public http:Http,public storage: Storage, public navParams: NavParams) {
		this.storage.get('iduser').then((val) => {
			let link =this.Api.ApiPath+"=get_message_group&x1="+val;
			this.http.get(link).map(res => res.json())
				.subscribe(data => {
					console.log(data);
					this.notification=data;
				});
		});
	}

	posts(x, i){
		console.log(x);
		this.notification[i].numb=0;
		console.log(this.Api.ApiPath+'=get_message_status_clear&x1='+x.sender+'&x2='+x.receiver);
		this.http.get(this.Api.ApiPath+'=get_message_status_clear&x1='+x.sender+'&x2='+x.receiver).map(res=> res.json())
			.subscribe(data => {
				console.log(data);
				this.MessageStatus='';
			});
		this.navCtrl.push(MessagepostPage, { id:x });
	}			  
	
	search(){
		this.navCtrl.push(SearchUserPage,{});
	}			  

	userphoto(x){
		if((x=='')||(x==null)||(x=='undefined')){
			return 'images/noimage.jpg'; 
		} else {
			return x;  
		}
	}

	ionViewDidLoad() {
		console.log('message');
	}
}
