import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileListPage } from "../profile-list/profile-list";
import { ApiProvider } from '../../providers/api/api';


/*
  Generated class for the ProfileList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  title:any;
  id:any;
  tasks:any;
  imgaddlogo: string = "http:\/\/edlinkup.co.tz\/";
    urltask =this.Api.ApiPath+'=gettasks&x1=';
	 
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public Api:ApiProvider) {
    this.title = navParams.get('title');
	this.id = navParams.get('id');
	console.log(this.urltask);
	console.log(this.id);
	this.gettask(this.id);
  }
    gettask(id){
	 this.http.get(this.urltask+id)
       .map(res => res.json())
       .subscribe(data => {
        this.tasks = data.subTasks;
       });
   }
   openConnect(connect,id){
    console.log('The press:' + connect);
    this.navCtrl.push(ProfileListPage,{title:connect,id:id});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileListPage');
  }

}
