import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { Content, IonicPage, NavController,App  } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { CommentsPage } from "../comments/comments";
import { DetailPage } from "../detail/detail";
import { MessagePage } from "../message/message";
import { NotificationPage } from "../notification/notification";
import { SchoolPage } from "../school/school";
import { SearchprofilePage } from "../searchprofile/searchprofile";
import { StudentPage } from "../student/student";
import { TeacherPage } from "../teacher/teacher";
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html' 
})
export class HomePage {
    @ViewChild("contentRef") contentHandle: Content;
    private tabBarHeight:any=0;


    segments:any='timeline';
    panel:any='news';
    data:any=[];
    accounts:any='';
    news:any='';
    limitID=0;
    acclist=0;
    limit=10;
    user:any='';
    iduser:any='';
    idMember:any='';
    likeStatus:boolean=false;
    testCheckboxOpen: boolean = false;
    testCheckboxResult:any;
    imgadd: string =this.Api.imgadd;
    imgaddlogo: string =this.Api.imgaddlogo;
    //openAcc:boolean=false;
    constructor(public navCtrl: NavController,public Api:ApiProvider,public http:Http,private statusBar: StatusBar,public storage: Storage, public app:App ) {
        storage.get('iduser').then((val) => {
            this.iduser= val;
            this.Api.getUpdates(0,10,'news',val).map(res => res.json())
                      .subscribe(data => {
                          // console.log(data);
                          this.data = data;
                          this.news=this.data.updates;
                      });
        });	
        storage.get('access').then((val) => {
            // console.log(val);
            this.accounts=val;
            this.acclist=this.accounts.length;
            // this.openAcc=true;
        });	
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#ffffff') 
    }
 
 
    userphoto(x){
	  
	  if((x=='')||(x==null)){
		  
		 return 'images/noimage.jpg'; 
	  }else{
		  
		  
		return x;  
	  }
	  
  }
   
   
    openDetail(){
	 
		 this.navCtrl.push(DetailPage,{});  
		
	  
}
   
   
    openManager(connect,id,privelege,details){
	  if(privelege=='student'){
		   // console.log(privelege);
		 this.navCtrl.push(StudentPage,{title:connect,id:id,privelege:privelege,details:details});  
		  
	  }
	  
	   if(privelege=='teacher'){
		  
		   console.log(privelege);
		 this.navCtrl.push(TeacherPage,{title:connect,id:id,privelege:privelege,details:details});  
		  
	  }
	  
}
  
    Panel(x) {
        this.limitID=10;
        this.panel=x;
        this.news='';
        this.Api.getUpdates(0, 10, this.panel, 2).map(res => res.json())
                  .subscribe(data => {
                      console.log(data);
                      this.data = data;
                      this.news=this.data.updates;
                  });
    }
	
	scrollingFun(e) {
	if(this.tabBarHeight<e.scrollTop)
	{ 
      this.tabBarHeight=e.scrollTop; 
	 
	  console.log('Juu');
	  document.querySelector("ion-header")['style'].display = 'none';
     // document.querySelector("ion-tabs")['style'].display = 'none';
     
	  }
	 	
		  
		  
	  if(this.tabBarHeight>e.scrollTop)
	  { 
      this.tabBarHeight=e.scrollTop; 
	  console.log("chini");
	  document.querySelector("ion-header")['style'].display = 'flex';
      //document.querySelector("ion-tabs")['style'].display = 'flex';
     
       }
		  
	
	
  }
  
    search() {
        this.navCtrl.push(SearchprofilePage, {});
    }

    openTimeline(connect, id) {
        console.log('The press:' + connect);
        this.navCtrl.push(SchoolPage, { title:connect, id:id });
    }
    
    opentComment(id, photo, iduser){
        this.navCtrl.push(CommentsPage, { id:id, user:this.user, iduser:iduser });	
    }

    openmessage() {
        this.navCtrl.push(MessagePage, {});	
    }
    
    opennote() {
        this.navCtrl.push(NotificationPage, {});	
    }
	
   openLikes(item,i,likes,status){
	  if(status=='true'){
				
				this.news[i].likeStatus='false';
				this.news[i].likes--;
				
			}else{
				this.news[i].likeStatus='true';
				this.news[i].likes++;
				
			}
			
			this.storage.get('iduser').then((val) => {
             
			 this.Api.likesUrl(item,val);
  });	
			
			
			
			
       // this.http.get('http://spmelimu.com/august2017/classes/dataHandler.php?x=likes&x1='+item+'&x2='+51)
       //.map(res => res.json())
       // .subscribe(data => {
       // });
	 
   }
   
   
    openFollows(item,i,follow){
	  
			if(follow=='true'){
				
				this.news[i].followStatus='false';
			}else{
				this.news[i].followStatus='true';
				
			}
        
		this.storage.get('iduser').then((val) => {
             
			 this.Api.followUrl(item,val,follow);
  });	
			
	   
   }
  
  
 SharePost(x,y,i){
		
  if(y!=''){
				
				this.news[i].shared='true';
			}else{
				this.news[i].shared='';
				
			}
        
   this.storage.get('iduser').then((val) => {
              this .Api.SharePost(x,val);
			 
  });	
}
  
	
	
	
	



     // pull to refresh method...
    doRefresh(refresher) {
        this.Api.getUpdates(0, 10, this.panel, 2)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                this.news = this.data.updates;
            });
        
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
	
	
    // infinite scroll method...
    doInfinite(infiniteScroll) {
		this.limitID += 10;
		
        this.Api.getUpdates(this.limitID, this.limit, this.panel, 2)
            .map(res => res.json())
            .subscribe(data => {
                this.data = data.updates;
                
                for(var i=0; i<this.data.length; i++) {
                    this.news.push(this.data[i]);
                }
            });

        setTimeout(() => {
            infiniteScroll.complete();
        }, 500);
    }

}
