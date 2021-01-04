import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;


/**
 * Generated class for the StudentReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-student-report',
    templateUrl: 'student-report.html',
})

export class StudentReportPage {
    title:any;
    ids:any;
    imgadd: string =this.Api.imgadd;
    imgaddlogo: string =this.Api.imgaddlogo;
    urltask=this.Api.ApiPath+'=studentReport&x1=';
    StudentMax:any;
    year:any;
    term:any;
    exam:any;
    classId:any;
    streamId:any;
    subjectId:any;
    idMember:any;
    idProfile:any;
    loading: any;
    userData : any;
    gradelevol:any;
    streamname:any;
    termname:any;
    examname:any;
    classname:any;
    name:any;
    teacher:any;
    headteacher:any;
    total:any;
    division:any;
    rank:any;
    remark:any;
    studenttotal:any;
    subject:any;
    teachersubject:any;
    average:any;
    points:any;
    marks:any;
    grade:any;
    photo:any;
  schoolstamp: any;
  reportData: any;
  schoolname: any;
  letterObj = {
    to:'',
    from:'',
    text:''
  }
  pdfObj=null;
    
    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public Api:ApiProvider, public loadingCtrl: LoadingController) {
        this.schoolstamp=navParams.get('schoolstamp');
        this.schoolname=navParams.get('schoolname');
        this.reportData=navParams.get('datas');
        this.title = this.reportData.title;
        this.photo= this.reportData.photo;
        this.year= this.reportData.year;
        this.term= this.reportData.term;
        this.exam= this.reportData.exam;
        this.name= this.reportData.name;
        this.marks= this.reportData.marks;
        this.grade= this.reportData.grade;
        this.streamname= this.reportData.streamname;
        this.examname= this.reportData.examname;
        this.termname= this.reportData.termname;
        this.classname= this.reportData.classname;
        this.idMember= this.reportData.idMember;
        this.idProfile= this.reportData.idProfile;
        this.classId= this.reportData.classId;
        this.subject= this.reportData.subject;
        this.teachersubject= this.reportData.teachersubject;
        this.total= this.reportData.total;
        this.division= this.reportData.division;
        this.average= this.reportData.average;
        this.points= this.reportData.points;
        this.rank= this.reportData.rank;
        this.remark= this.reportData.remark;
        this.studenttotal= this.reportData.studenttotal;
        this.teacher= this.reportData.teacher;
        this.headteacher= this.reportData.headteacher;
        this.gradelevol= this.reportData.gradelevol;
        // console.log(this.termname);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StudentReportPage');
    }

    userphoto(x){
      if ((x=='') || (x==null)) {
        return 'images/noimage.jpg'; 
      } else {
        return x;  
      }
    }
}
