import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ApiProvider } from '../../providers/api/api';
import { ContactPage } from '../contact/contact';
import {  Http} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ConnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html',
})
export class ConnectPage {

  title:any;
  id:any;
  tasks:any;
  urltask =this.Api.ApiPath+'=gettasks&x1=';
	 
  constructor(public navCtrl: NavController, public navParams: NavParams,public Api:ApiProvider,public http:Http) {
    this.title = navParams.get('title');
	this.id = navParams.get('id');
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
   this.navCtrl.push(ContactPage,{title:connect,id:id});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectPage');
  }


}
