import {Component} from '@angular/core';
import {NavParams} from "ionic-angular";

/**
 * Generated class for the ServiceInfomationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'service-infomation',
    templateUrl: 'service-infomation.html'
})
export class ServiceInfomationComponent {

    text: string;
    service: any;

    constructor(public navParams: NavParams) {
        console.log('Hello ServiceInfomationComponent Component');
        this.text = 'Hello World';
        this.service = navParams.get('service');

        console.log(this.service);
    }

}
