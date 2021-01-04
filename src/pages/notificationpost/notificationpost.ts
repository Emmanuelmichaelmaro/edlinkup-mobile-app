import { Component} from '@angular/core';
import { NavController, NavParams ,ModalController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { EditModalPage } from "../edit-modal/edit-modal";
import { Storage } from '@ionic/storage';
import {  ActionSheetController } from 'ionic-angular';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the NotificationpostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notificationpost',
  templateUrl: 'notificationpost.html',
})
export class NotificationpostPage {
  item:any='';
  
  
  id: any;
  images: any;
  comments: any;
  newComment: any;
  accounts: any;
  user: any;
  post: any;
  iduserpost: any;
  letter: any = 'O';
  imgadd: string =this.Api.imgadd;
  imgaddlogo=this.Api.imgaddlogo;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,public http:Http, public Api:ApiProvider,public storage: Storage,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController) {
               
this.item = navParams.get('data');
this.id=this.item.id;
this.storage.get('iduser').then((val) => {
	  this.user= val;
	  
  });	
  this.iduserpost = navParams.get('iduser');
  this.storage.get('user').then((val) => {
	  this.user=val.idUser;
	  this.images=val.logo;
  });

	
	this.Api.onGetPostComments(this.id).map(res => res.json())
       .subscribe(data => {
		   this.comments=data;
		   console.log(data[0]);
       });
  }
  
  adjustTextarea(event: any): void {
	let textarea: any		= event.target;
	textarea.style.overflow = 'hidden';
	textarea.style.height 	= 'auto';
	textarea.style.height 	= textarea.scrollHeight + 'px';
	return;
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  onComment(): void {
	  
	  if(this.newComment){
		  this.Api.postComment(this.id,this.newComment,this.user).map(res => res.json())
       .subscribe(data => {
		   this.comments = data;
		   this.newComment='';
		console.log(this.comments);
       });
		  
	  }
	  console.log(this.newComment);
   
  }
  
  

  userphoto(x){
	  
	  if((x=='')||(x==null)){
		  
		 return 'images/noimage.jpg'; 
	  }else{
		  
		  
		return x;  
	  }
	  
  }
   
  
  
  onGetPostComments(post_id){
	  
    this.Api.onGetPostComments(post_id).map(res => res.json())
       .subscribe(data => {
		this.comments = data;
		console.log("gdjakak");
		console.log(this.comments);
       });
	
  }

  avatarLetter(name) {
    let letter = name.substr(0, 1);
    return letter;
  }

   editPost(x,y) {
	  if(y.idUser!=this.user){
		  
		 return false; 
	  }
	  let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        { icon :'ios-create-outline',
          text: 'Edit Post',
          handler: () => {
			  console.log('Edit Post');
			  console.log(y);
			  console.log(x);
			 this.presentProfileModal(x,y);
            
          }
        },
        { icon:'ios-trash-outline',
          text: 'Delete',
          handler: () => {
			  console.log('Delete');
			  console.log(y);
			  console.log(x);
		      this.deletepost(x,y);
          }
        },
		{ 
		
		  icon:'ios-close-circle-outline',
          text: 'Cancel',
		  role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  
	  
	  
  

  
}


presentProfileModal(x,y) {
	//console.log(x);
   let profileModal = this.modalCtrl.create(EditModalPage, { post:y.comment});
   profileModal.onDidDismiss(data => {
     console.log(data);
	 if(data.role=='submit'){
		 
this.editpost(x,y,data.post); 
	 }
	 
   });
   profileModal.present();
 }
	
	
 editpost(x,y,z){
	 
	 let link =this.Api.ApiPath+"=saveeditcomment&x1=4";
	 
	 let body = new FormData();
    body.append('post',z );
    body.append('idpost', y.id);
    this.post ='';
	this.comments[x].comment=z;
	
	
       this.http.post(link, body)
        .subscribe(data => {
			
        }, error => {
			 console.log(error);
			 //this.post =error;
            console.log("Oooops!");
        });
		
	 
 }
 deletepost(x,y){
	 let link =this.Api.ApiPath+"=deletecomment&x1="+y.id;
	let body = new FormData();
    body.append('post','edited' );
    body.append('id', y.id);
	
	 this.http.post(link, body)
        .subscribe(data => {
        }, error => {
			 console.log(error);
			 //this.post =error;
            console.log("Oooops!");
        });
	 
	 
	 
	 
		(this.comments).splice(x, 1);
	 
	 
	 
 }
  
}
