import { Component } from '@angular/core';
import { NavController, NavParams,App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileTransferObject,FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { AboutPage } from '../about/about';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {
    imageURI:any=this.Api.imgaddlogo+'images/noimage.jpg';
    imageFileName:boolean = false;
    imgadd: string =this.Api.imgadd;
    imgaddlogo: string =this.Api.imgaddlogo;

    segments:any='manager';
    user:any='';
    idUser:any='';
    data:any='';
    tasks:any='';
    url:any;
    post:any='';
    idMember:any='';
    storageDirectory:any='';
    rootPage:any;
    public username:any;
    public password:any;
    public hideTabs:boolean = true;
    loginStatus: boolean =false;

    constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
		public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
			public http:Http, public Api:ApiProvider, private storage: Storage,
			    private transfer: FileTransfer, private camera: Camera, private app: App) {

			        this.storage.get('user').then((user) => {
                        this.user=user;
        
                        this.idUser=this.user.idUser;
        
                        this.imageURI=this.imgaddlogo+this.userphoto(this.user.logo);
        
                        // console.log(this.imageURI);
		            });
    }

    getImage() {
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

    picture(sourceType) {

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

    changeImage() {
        let link=this.Api.ApiPath+"=updatelogo&x1="+this.idUser;

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
            
            // console.log(data);

            // this.user.logo=data.respose;
            
            // this.storage.set('user',this.user);

            loader.dismiss();
        
        }, (err) => {
            
            // console.log(err);
            
            loader.dismiss();

        });
    }
    
    showpassword() {
        this.navCtrl.push(ChangepasswordPage,{data:'change'});
    }

    showAboutUsPage() {
        this.navCtrl.push(AboutPage);
    }

    logout() {
        this.storage.remove('loginStatus');
        
        this.app.getRootNav().setRoot(LoginPage);
    }

    userphoto(x) {

        if ((x=='') || (x==null) || (x=='undefined')) {
            return 'images/noimage.jpg';
        } else {
            return x;
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Detail Page');
    }
}
