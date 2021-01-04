import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";

// Ionic
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicModule, IonicErrorHandler, Badge } from 'ionic-angular';
import { NgCalendarModule } from "ionic2-calendar";

// Components
import { MyApp } from './app.component';

// Providers
import { ApiProvider } from '../providers/api/api';
import { CustomInformationProvider } from '../providers/custom-information/custom-information';

import { Base64 } from '@ionic-native/base64';
import { Calendar } from "@ionic-native/calendar";
import { Camera } from "@ionic-native/camera";
import { Crop } from "@ionic-native/crop";
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileOpener } from '@ionic-native/file-opener';
import { FilePath } from "@ionic-native/file-path";
import { FileTransferObject, FileTransfer } from "@ionic-native/file-transfer";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ImagePicker } from "@ionic-native/image-picker";
import { Keyboard } from "@ionic-native/keyboard";
import { Network } from "@ionic-native/network";
import { Printer } from '@ionic-native/printer';
import { SocialSharing } from "@ionic-native/social-sharing";
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from "@ionic-native/toast";

// Pages
import { AboutPage } from '../pages/about/about';
// import { AccountPage } from '../pages/account/account';
import { CallAttendPage } from "../pages/call-attend/call-attend";
import { ChangepasswordPage } from "../pages/changepassword/changepassword";
// import { CommentPage} from "../pages/comment/comment";
import { CommentsPage} from "../pages/comments/comments";
// import { ConnectPage } from '../pages/connect/connect';
// import { ContactPage } from '../pages/contact/contact';
import { DetailPage } from "../pages/detail/detail";
import { EditModalPage } from "../pages/edit-modal/edit-modal";
import { ExamPage } from '../pages/exam/exam';
// import { ExamplePage } from '../pages/example/example';
import { ForgotenPage } from "../pages/forgoten/forgoten";
// import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
import { ManagePage  } from '../pages/manage/manage';
// import { MessagePage } from "../pages/message/message";
import { MessagepostPage } from "../pages/messagepost/messagepost";
// import { NotificationPage } from "../pages/notification/notification";
import { NotificationpostPage } from "../pages/notificationpost/notificationpost";
import { ProfileListPage } from "../pages/profile-list/profile-list";
import { SchoolPage } from "../pages/school/school";
import { SearchprofilePage } from "../pages/searchprofile/searchprofile";
import { SearchUserPage } from "../pages/search-user/search-user";
import { SignupPage } from '../pages/signup/signup';
import { StudentPage } from '../pages/student/student';
import { studentprofilePage } from '../pages/student-profile/student-profile';
// import { StudentReportPage } from '../pages/student-report/student-report';
// import { TabsPage } from '../pages/tabs/tabs';
import { TeaccherSubjectPage } from "../pages/teaccher-subject/teaccher-subject";
import { TeacherPage } from '../pages/teacher/teacher';
import { TimelinePage} from "../pages/timeline/timeline";

@NgModule({
    imports: [
        BrowserModule,
		HttpModule,
		HttpClientModule,
        NgCalendarModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    providers: [
		ApiProvider,
        Badge,
		Base64,
        Calendar,
        Camera,
        Crop,
        CustomInformationProvider,
		DocumentViewer,
        File,
        FilePath,
		FileTransferObject,
        FileTransfer,
		FileOpener,
		FileChooser,
        ImagePicker,
        InAppBrowser,
        Keyboard,
        Network,
		Printer,
        SocialSharing,
        SplashScreen,
        StatusBar,
        // TestBed.configureTestingModule(),
		Toast,
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
	],
    declarations: [
		AboutPage,
		// AccountPage,
		CallAttendPage,
		ChangepasswordPage,
		// CommentsPage,
		CommentsPage,
		// ConnectPage,
		// ContactPage,
		DetailPage,
		EditModalPage,
		ExamPage,
		ForgotenPage,
		// HomePage,
		// LoginPage,
		// MessagePage,
		ManagePage,
		MessagepostPage,
		MyApp,
		// NotificationPage,
		NotificationpostPage,
		ProfileListPage,
		SchoolPage,
		SearchprofilePage,
		SearchUserPage,
		SignupPage,
		StudentPage,
		studentprofilePage,
		// StudentReportPage,
		// TabsPage,
		TeaccherSubjectPage,
		TeacherPage,
		TimelinePage
    ],
    entryComponents: [
		AboutPage,
		// AccountPage,
		CallAttendPage,
		ChangepasswordPage,
		// CommentsPage,
		CommentsPage,
		// ConnectPage,
		// ContactPage,
		DetailPage,
		EditModalPage,
		ExamPage,
		ForgotenPage,
		// HomePage,
		// LoginPage,
		// MessagePage,
		ManagePage,
		MessagepostPage,
		MyApp,
		// NotificationPage,
		NotificationpostPage,
		ProfileListPage,
		SchoolPage,
		SearchprofilePage,
		SearchUserPage,
		SignupPage,
		StudentPage,
		studentprofilePage,
		// StudentReportPage,
		// TabsPage,
		TeaccherSubjectPage,
		TeacherPage,
		TimelinePage
    ],
    bootstrap: [ IonicApp ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }
