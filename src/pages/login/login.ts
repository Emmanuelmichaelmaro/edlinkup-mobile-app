import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ForgotenPage } from '../forgoten/forgoten';
import { SignupPage } from '../signup/signup';
// import { TabsPage } from "../tabs/tabs";
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
   user:any="";
  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public Api:ApiProvider) {
  // console.log('Your age is');
  // set a key/value
  storage.set('name', 'Max');
  
  
  
  
  // Or to get a key/value pair
 storage.get('name').then((val) => {
    // console.log('Your age is', val);
  });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
 
  
  

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
	
 onSignup2() {
    this.navCtrl.push(ForgotenPage);
  }
	
 public onLogin(x,y) {
   if ((x === undefined || y === undefined)) {
      this.presentToast("Please fill all the fields");	
    } else if(x.trim().length == 0 || y.trim().length == 0) {
      this.presentToast("Please fill all the fields");
    }
    else {
      this.Api.AccessUrl(x,y).map(res => res.json())
                .subscribe(data => {
            // console.log(data);
            if(data.loginStatus==1){
          this.storage.set('phone',x);
          this.storage.set('password',y);
          this.user=data.user;
          //this.access=data.access;
          this.storage.set('user',data.user);
          this.storage.set('access',data.access);
          this.storage.set('iduser',this.user.idUser);  
            this.storage.set('loginStatus',data.loginStatus);
          // console.log('save'); 
              this.storage.get('phone').then((val) => {
              // console.log('Your age is', val);
              });		 
              //this.navCtrl.push('TabsPage');
            //this.app.getRootNav().setRoot(TabsPage);
            this.navCtrl.setRoot('TabsPage');
            }else{
              
              this.presentToast("wrong Password or phone number ");	
              
            }
              });
    }
	  
	  
	  
	
		
		}
	
		presentToast(msg) {
    let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
	cssClass: "yourCssClassName",
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    // console.log('Dismissed toast');
  });

  toast.present();
  }
	
}

