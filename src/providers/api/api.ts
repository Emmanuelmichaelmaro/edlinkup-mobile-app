import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiProvider {
    // Domain = "192.168.8.100/stankonya2";
    // Domain = "localhost/stankonya2";
    Domain = "edlinkup.co.tz";

    ApiPath = "https://"+this.Domain+"/classes/dataHandler.php?x";

    urlpost = this.ApiPath+'=getupdatesmobile&x1=148&x2=1&x3=news=&x4=';
    repostUrl = this.ApiPath+"=repost&x1=";

    urlTask = this.ApiPath+"=schoolupdates&x1=";
    urlGetProfile = this.ApiPath+"=getprofile&x1=";
    urlGetExamList = this.ApiPath+'=getStudentExamlist&x1=';
    urlUserTimeline = this.ApiPath+'=getMyupdates&x1=';

    openFollowsUrl: string = this.ApiPath+"=follow&x1=";

    imgadd: string = "https:\/\/"+this.Domain+"\/images\/post\/";
    imgaddlogo: string = "https:\/\/"+this.Domain+"\/";

    loginStatus=0;

    Marks: any = new Array();
    user: any;

    constructor (public http: Http, public storage: Storage) {
        console.log('Hello ApiProvider Provider');
    }

	getUpdates (limitID, limit, panel, userID) {
		return this.http.get(this.ApiPath+'=getupdatesmobile&x1='+limitID+'&x2='+limit+'&x3='+panel+'&x4='+userID);
	}

	getTeacherSubjects (idSchool, classId, streamId) {
        // https://edlinkup.co.tz/classes/dataHandler.php?x=getstudentlist&x1=2018&x2=17&x3=12&x4=&x5=1&x6=2
		return this.http.get(this.ApiPath+'=getstudentlist&x1=2019&x2='+classId+'&x3='+streamId+'&x4=&x5=1'+'&x6='+idSchool);
	}

	APIsaveResults (marksid, marks, term, exam, classId, streamId, subjectId, idMember, idSchool) {
		this.http.get(this.ApiPath+'=setmarks&x1='+marksid+'&x2='+marks+'&x3='+classId+'&x4='+subjectId+'&x5='+streamId+'&x6='+2018+'&x7='+term+'&x8='+exam+'&x9='+idMember+'&x10='+idSchool+'&x11='+marks)
            .map(res => res.json()).subscribe(data => {
                // console.log(data);
        });
	}

    getExamScoreslink (marksid,marks,term,exam,classId,streamId,subjectId,idMember,idSchool) {
		return this.http.get(this.ApiPath+'=getmarks&x1='+marksid+'&x2='+marks+'&x3='+classId+'&x4='+subjectId+'&x5='+streamId+'&x6='+2018+'&x7='+term+'&x8='+exam+'&x9='+idMember+'&x10='+idSchool+'&x11='+marks);
	}

    getTeacherTimetable (id,school) {
		return this.http.get(this.ApiPath+"=getteachertimeTable&x1="+id+"&x2="+school);
	}

    getExamList (id, year, classname, stream) {
		return this.http.get(this.urlGetExamList+id+'&x2='+year+'&x3='+classname+'&x4='+stream);
	}

    get_teacherReport (id) {
		return this.http.get(this.ApiPath+'=get_teacherreport&x1='+id);
	}

    get_termexam (id) {
		return this.http.get(this.ApiPath+'=getTermExam&x1='+id);
	}

    getSubjectMarks (classid, subjectid, termid, examid) {
		return this.http.get(this.ApiPath+"=getclasssubjectmarks&x1="+classid+"&x2="+subjectid+"&x3="+termid+"&x4="+examid);
	}

    openFollows_ (item, memberId) {
		return this.http.get(this.openFollowsUrl+item+"&x2="+memberId);
	}

    gettask (id) {
		return this.http.get(this.urlTask+id);
	}

    getProfile (id) {
		return this.http.get(this.urlGetProfile+id)
	}

    followUrl (id, idUser, status) {
		this.http.get(this.ApiPath+'=follow&x1='+id+'&x2='+idUser+'&x3='+status).map(res => res.json()).subscribe(data => {
            console.log(data);
        });
	}

    likesUrl (item, memberId) {
        this.http.get(this.ApiPath+'=likes&x1='+item+'&x2='+memberId).map(res => res.json()).subscribe(data => {
            // console.log(data);
        });
    }

    // Repost
    SharePost (postId, idUser) {
        this.http.get(this.repostUrl+postId+"&x2="+idUser).map(res => res.json()).subscribe(data => {
            // console.log(data);
        });
    }

    getMembers (item) {
        return this.http.get(this.ApiPath+'=members&x1='+item);
    }

    onGetPostComments (item) {
        // console.log(this.ApiPath+'=getcomments&x1='+item);
        return this.http.get(this.ApiPath+'=getcomments&x1='+item);
    }

    postComment (postid, comment, user) {
        return this.http.get(this.ApiPath+'=postcomment&x1='+postid+'&x2='+user+'&x3='+comment);
    }

    getSchoolProfile (item) {
        return this.http.get(this.ApiPath+'=getprofile&x1='+item);
    }

    getTerms (id,link) {
        return this.http.get(this.ApiPath+'='+link+'&x1='+id);
    }

	getExamResults (year, term, exam, classId, streamId, subjectId, idMember, idSchool) {
		return this.http.get(this.ApiPath+'=getExamResultsForStudent&x1='+idSchool+'&x2='+year+'&x3='+classId+'&x4='+streamId+'&x5='+term+'&x6='+exam+'&x7='+idMember);
	}

	AccessUrl (username, password) {
		return this.http.get(this.ApiPath+'=login&x1='+username+'&x2='+password);
	}

	UserManager (username, password){
		return this.http.get(this.ApiPath+'=login&x1='+username+'&x2='+password);
	}
}
