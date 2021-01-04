import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, LoadingController } from 'ionic-angular';
import { FileTransfer, FileTransferObject,FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { SchoolPage } from "../school/school";
import { ManagePage } from "../manage/manage";
import { TimelinePage } from "../timeline/timeline";

import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the TeacherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-teacher',
    templateUrl: 'teacher.html',
})

export class TeacherPage {
    imageURI:any = this.Api.imgaddlogo+'images/noimage.jpg';
    imgadd: string = this.Api.imgadd;
    imgaddlogo: string = this.Api.imgaddlogo;
    urltask = this.Api.ApiPath+'=member&x1=';

    title:any;
    id:any;
    Documents:any='';
    Timetable:any='';
    Attendance:any='';
    tasks:any='';
    Profile:any='';
    School:any='';
    Reports:any='';
    Gallery:any='';
    Subjects:any='';
    Diary:any='';
    Details:any='';
    idUser:any='';
    idProfile:any='';
    idMember:any='';
    Timeline:any='';
    Fee: { required ?: string, payment ?: string } = {};

    constructor(public navCtrl: NavController, public Api:ApiProvider,
			   private storage: Storage, public navParams: NavParams,public http: Http, public actionSheetCtrl: ActionSheetController,
			   private transfer: FileTransfer, private camera: Camera, public loadingCtrl: LoadingController) {
        this.title = navParams.get('title');
        this.id = navParams.get('id');
        this.Profile = navParams.get('details');
        this.imageURI = this.imgaddlogo + this.userphoto(this.Profile.photo);
        // console.log(this.Profile);
        // console.log(navParams.get('details'));
        // this.getProfile(this.Profile);

        this.idProfile=navParams.get('details').idProfile;
        this.idMember=navParams.get('details').idMember;
        // this.getSchool(this.idProfile);

        storage.get('iduser').then((iduser) => {
            this.idUser=iduser;
        });
    }

  	getProfile (id) {
        this.http.get(this.urltask+id).map(res => res.json())
            .subscribe(data => {
                this.Profile = data.profile;
                this.School= data.schoolprofile.Profile;
                // this.Timetable = data.timetable;
                // this.Attendance = data.attandanced;
                // this.Reports = data.report;
                // this.Fee.required = data.requiredpayment;
                // this.Fee.payment = data.payment;
                // this.Subjects = data.subjects;
                // this.Diary = data.diary;
            }
        );
    }

    getSchool (school) {
        this.http.get(this.Api.ApiPath+'=Myupdates&x1='+this.idUser+'&x2='+this.idMember).map(res => res.json())
            .subscribe(data => {
                this.Timeline=data;
            }
        );
    }

    openManager (name, id, connect) {
        this.navCtrl.push(ManagePage, { title:connect, name:name, id:id, idProfile:this.idProfile, idMember:this.idMember });
    }

    openSchool (connect, id) {
        console.log('The press:' + connect + ' And id = ' + id);

        this.navCtrl.push(SchoolPage, { title:connect, id:id });
    }

    openTimeline (connect, id, idMember, panel) {
        console.log('The press : ' + connect + ' And id = ' + idMember);

        this.navCtrl.push(TimelinePage, { title:connect, id:id, idMember:idMember, position:'teacher', panel:panel });
    }

    userphoto (x) {
        if ((x=='') || (x==null)) {
            return 'images/noimage.jpg';
        } else  {
            return x;
        }
    }

    getImage () {
        let actionSheet = this.actionSheetCtrl.create({
            title: '',
            buttons: [
                {
                    icon:'ios-image-outline',
                    text: 'Gallery',
                    handler: () => {
                        this.picture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },

                {
                    icon:'ios-camera-outline',
                    text: 'Camera',
                    handler: () => {
                        this.picture(this.camera.PictureSourceType.CAMERA);
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

    picture (sourceType) {
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            allowEdit: true,
            width: 80,
            height: 80
        };

        this.camera.getPicture(options).then((imageData) => {
            this.imageURI = imageData;
            this.changeImage();
        }, (err) => {
            // console.log(err);
            // this.presentToast(err);
        });
    }

    changeImage () {
        let link = this.Api.ApiPath + "=updatememberlogo&x1=" + this.idMember;

        const fileTransfer: FileTransferObject = this.transfer.create();

        let options1: FileUploadOptions = {
            fileKey: 'image',
            fileName: 'name.jpg',
            headers: {},
            params : {}
        }

        let loader = this.loadingCtrl.create({
            content: "Uploading..."
        });

        loader.present();

        fileTransfer.upload(this.imageURI, link, options1).then((data) => {
            loader.dismiss();
        }, (err) => {
            // console.log(err);
            // loader.dismiss();
        });
    }

    ionViewDidLoad () {
        console.log('ionViewDidLoad TeacherPage');
    }
}
