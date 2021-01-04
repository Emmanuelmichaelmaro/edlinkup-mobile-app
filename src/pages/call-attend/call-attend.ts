import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer,FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';

import { ApiProvider } from '../../providers/api/api';


/**
 * Generated class for the CallAttendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-call-attend',
    templateUrl: 'call-attend.html',
})

export class CallAttendPage {
    pepperoni:any=new Array();

    imgadd: string =this.Api.imgadd;
    imgaddlogo: string =this.Api.imgaddlogo;
    imageURI:any=this.Api.imgaddlogo+'images/noimage.jpg';
    imageFileName:boolean = false;

    attendStatus:any=new Array();
    studentids:any=new Array();
    photos:any=new Array();

    title:any='';
    Profile:any='';
    indx:any='';
    idstudent:any='';
    member:any='';
    name:any='';
    student:any='';
    myDate:any='';
    idschool:any='';
    stream:any='';
    classid:any='';

    constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public Api:ApiProvider, private transfer: FileTransfer,
        private camera: Camera, public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

        this.idschool=navParams.get('idschool');
        this.stream=navParams.get('stream');
        this.classid=navParams.get('classid');
        this.student=navParams.get('student');

        for (var i=0; i<this.student.length; i++) {
            this.studentids[i]=this.student[i].id;
        }

        this.myDate = new Date();

        this.getAttendance();
    }

    getAttendance () {

        // let link = this.Api.ApiPath+"=getteacherattendance&x1="++"&x2="++"&x3="++"&x4="+this.myDate+"&x5="+this.studentids;

        let link = this.Api.ApiPath+"=getteacherattendance&x1="+this.idschool+"&x2="+this.classid+"&x3="+this.stream+"&x4="+this.myDate+"&x5="+this.studentids;

        this.http.get(link).map(res => res.json()).subscribe(data => {
            console.log(data);

            this.attendStatus=data;
        });
    }

    setattendance(x){
        let link = this.Api.ApiPath+"=setattendance&x1=&x2="+this.classid+"&x3="+x+"&x4=&x5=&x6=1&x7=&x8="+this.stream+"&x9="+this.idschool+"&x10="+this.studentids;

        console.log(link);

        this.http.get(link).map(res => res.json()).subscribe(data => {
            console.log(data);

            this.attendStatus=data;
        });
    }

    setattendancedate () {}

userphoto(x){

	  if((x=='')||(x==null)||(x=='undefined')){

		 return 'images/noimage.jpg';
	  }else{


		return x;
	  }

  }




  getImage(x,i){
	    this.indx=i;
	  this.idstudent=x;

	  let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {icon:'ios-image-outline',
          text: 'Gallery',
          handler: () => {

            this.picture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        { icon:'ios-camera-outline',
          text: 'Camera',
          handler: () => {
			this.picture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {icon:'ios-close-circle-outline',
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();






}


  picture(sourceType){

	   var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true,
	allowEdit: true,
	width:80,
	height:80
  };

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
	this.changeImage();
  }, (err) => {
    console.log(err);
    //this.presentToast(err);
  });
  }




  changeImage(){


		let link =this.Api.ApiPath+"=studentphoto&x1="+this.idstudent;


    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
       fileKey: 'image',
       fileName: 'name.jpg',
       headers: {},
	   params : {
            }

    }
 let loader = this.loadingCtrl.create({
   content: "Uploading..."
  });
 loader.present();



fileTransfer.upload(this.imageURI,link, options1)
 .then((data) => {
	 this.Api.getTeacherSubjects(this.idschool,this.classid,this.stream)
       .map(res => res.json())
       .subscribe(data => {
		this.student=data.students;

		});

	 //this.presentToast(JSON.stringify(data.response));
	 //this.student[this.indx].photo=data.response;
   loader.dismiss();


 }, (err) => {
	 console.log(err);
   loader.dismiss();

 });

 }



	presentToast(sms) {
    let toast = this.toastCtrl.create({
      message: sms,
      duration: 3000
    });
    toast.present();
  }







  ionViewDidLoad() {
    console.log('ionViewDidLoad CallAttendPage');
  }

}
