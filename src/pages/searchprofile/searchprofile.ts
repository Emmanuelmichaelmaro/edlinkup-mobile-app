import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {  ApiProvider } from '../../providers/api/api';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {SchoolPage} from "../school/school";
/**
 * Generated class for the SearchprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-searchprofile',
  templateUrl: 'searchprofile.html',
})
export class SearchprofilePage {

 users:any=new Array();
  val:any="";
  imgadd: string =this.Api.imgadd;
  imgaddlogo: string =this.Api.imgaddlogo;
  constructor(public navCtrl: NavController,public Api:ApiProvider,
			   public http:Http,public storage: Storage, public navParams: NavParams) {
				this.storage.get('iduser').then((idUser) => {
						
	  let link =this.Api.ApiPath+"=searchprofile&x1=";
        this.http.get(link).map(res => res.json())
       .subscribe(data => {
		 this.users=data;
		});	   
		});
}
  get_users(ev: any){
	   const val = ev.target.value;
	   
	   if (val && val.trim() != '') {
      			
	  let link =this.Api.ApiPath+"=searchprofile&x1="+val;
             this.http.get(link).map(res => res.json())
       .subscribe(data => {
		 this.users=data;
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
  
  
  posts(x,connect){ 
    this.navCtrl.push(SchoolPage,{title:connect,id:x});
  }	
  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchUserPage');
  }

}
