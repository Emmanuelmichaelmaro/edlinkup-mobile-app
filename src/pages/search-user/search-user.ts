import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ApiProvider } from '../../providers/api/api';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {MessagepostPage} from "../messagepost/messagepost";

/**
 * Generated class for the SearchUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {
users:any=new Array();
  val:any="";
  imgadd: string =this.Api.imgadd;
  imgaddlogo: string =this.Api.imgaddlogo;
  constructor(public navCtrl: NavController,public Api:ApiProvider,
			   public http:Http,public storage: Storage, public navParams: NavParams) {
				this.storage.get('iduser').then((idUser) => {
						
	  let link =this.Api.ApiPath+"=get_users&x1=&x2="+idUser;
        this.http.get(link).map(res => res.json())
       .subscribe(data => {
		 this.users=data;
		});	   
		});
}
  get_users(ev: any){
	   const val = ev.target.value;
	   
	   if (val && val.trim() != '') {
      	this.storage.get('iduser').then((idUser) => {
						
	  let link =this.Api.ApiPath+"=get_users&x1="+val+"&x2="+idUser;
             this.http.get(link).map(res => res.json())
       .subscribe(data => {
		 this.users=data;
		});
	  });
	  
    }
	   
	  
	  
  }
  
   
userphoto(x){
	  
	  if((x=='')||(x==null)||(x=='undefined')){
		  
		 return 'images/noimage.jpg'; 
	  }else{
		  
		  
		return x;  
	  }
	  
  }
  
  
  posts(x){ 
      console.log(' ');
      console.log(x);
     this.navCtrl.push(MessagepostPage,{id:x});
  }	
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchUserPage');
  }

}
