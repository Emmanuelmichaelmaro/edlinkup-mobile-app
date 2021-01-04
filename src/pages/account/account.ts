import {  Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {  ApiProvider } from '../../providers/api/api';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {  NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading  } from 'ionic-angular';
import {  StudentPage} from "../student/student";
import {  TeacherPage} from "../teacher/teacher";
import {CommentsPage} from "../comments/comments";
import {  SchoolPage} from "../school/school";
import { Storage } from '@ionic/storage';
import { DetailPage } from "../detail/detail";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  lastImage: string = null;
  loading: Loading;
  imgadd: string =this.Api.imgadd;
  imgaddlogo: string =this.Api.imgaddlogo;
  segments:any='manager';
  user:any='';
  idUser:any='';
  data:any='';
  access:any='';
  tasks:any='';
  url:any;
  post:any='';
  idMember:any='';
  panel:any='';
  
  storageDirectory:any='';
  public username:any;
  public  password:any;
  limitID:any=10;
  loginStatus: boolean =false;
  
  
  constructor(public navCtrl: NavController,
			  public navParams: NavParams, 
			  public Api:ApiProvider,
			  public http:Http,
			  public storage: Storage,
			  public platform: Platform, 
			  public actionSheetCtrl: ActionSheetController, 
			  public toastCtrl: ToastController,
			  public loadingCtrl: LoadingController) {
                 //this.getupdates();
	             
		

         this.storage.get('access').then((val) => {
             this.access =val;
			 console.log(val);
			 });
        this.storage.get('iduser').then((val) => {
             this.idUser=val;
			 });
        this.storage.get('user').then((val) => {
                 this.user=val;
			 });			 
  
              //access
			  
			    //  this.Panel('news');
  
  }
	  
 openDetail(){
	 
		 this.navCtrl.push(DetailPage,{});  
		
	  
}

  openTimeline(connect,id){
    console.log('The press:' + connect);
    this.navCtrl.push(SchoolPage,{title:connect,id:id});
}
  userphoto(x){
	  
	  if((x=='')||(x==null)){
		  
		 return 'images/noimage.jpg'; 
	  }else{
		  
		  
		return x;  
	  }
	  
  }
  
  
  
 opentComment(id,photo,name){
	this.navCtrl.push(CommentsPage,{id:id,user:this.user});	
	}
 openLikes(item,i,likes,status){
	  if(status=='true'){
				
				this.tasks[i].likeStatus='false';
				this.tasks[i].likes--;
				
			}else{
				this.tasks[i].likeStatus='true';
				this.tasks[i].likes++;
				
			}
			
			
	   this.storage.get('iduser').then((val) => {
            
			 this.Api.likesUrl(item,val);
			 });
	  
       
	   
   }
   
   
    openFollows(item,i,follow){
	  
			if(follow=='true'){
				
				this.tasks[i].followStatus='false';
			}else{
				this.tasks[i].followStatus='true';
				
			}
        
		this.storage.get('iduser').then((val) => {
             
			 this.Api.followUrl(item,val,follow);
  });	
			
	   
   }
  
  
  Panel(x){
		this.limitID=0;
		console.log(x);
		this.panel=x;
		this.tasks ='';
		this.http.get(this.Api.urlUserTimeline+this.idUser+'&x2=&x3='+this.panel+'&x4='+this.limitID)
       .map(res => res.json())
       .subscribe(data => {
        this.tasks = data;
		console.log(this.tasks);
		}); 
	
		
	}
	
  
  
   //pull to refresh method...
    doRefresh(refresher) {
		this.limitID=0;
		//this.tasks ='';
		console.log(this.Api.urlUserTimeline+this.idUser+'&x2=&x3='+this.panel+'&x4='+this.limitID);
		this.http.get(this.Api.urlUserTimeline+this.idUser+'&x2=&x3='+this.panel+'&x4='+this.limitID)
       .map(res => res.json())
       .subscribe(data => {
        this.tasks = data;
		console.log(this.tasks);
		}); 

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 500);
    }
  
  openManager(connect,id,privelege,details){
	  if(privelege=='student'){
		  
		   console.log(privelege);
		 this.navCtrl.push(StudentPage,{title:connect,id:id,privelege:privelege,details:details});  
		  
	  }
	  
	   if(privelege=='teacher'){
		  
		   console.log(privelege);
		 this.navCtrl.push(TeacherPage,{title:connect,id:id,privelege:privelege,details:details});  
		  
	  }
	  
}
  
adjustTextarea(event: any): void {
	let textarea: any		= event.target;
	textarea.style.overflow = 'hidden';
	textarea.style.height 	= 'auto';
	textarea.style.height 	= textarea.scrollHeight + 'px';
	return;
}
	
	
	
	
	
	
	
	
	


  editProfile(){
    console.log('Edit my profile...');
  }

  
  
   //infinite scroll method..
    doInfinite(infiniteScroll) {
		this.limitID+=10;
		console.log('Begin ');
		this.http.get(this.Api.urlUserTimeline+this.idUser+'&x2=&x3='+this.panel+'&x4='+this.limitID)
       .map(res => res.json())
       .subscribe(data => {
        //this.tasks = data;
		for(var i=0;i<data.length;i++){
			this.tasks.push(data[i]);
			console.log(data[i]);
		}
		//console.log(this.tasks);
		}); 
		
        
        //this.getPostsSample();
        console.log('Begin async operation');

        setTimeout(() => {

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }

  
  
  }
