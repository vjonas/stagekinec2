import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'individualUser',
    templateUrl: 'individualuser.component.html',
    styleUrls: ['./individualuser.component.css']
})

export class IndividualUserComponent{
    constructor(private router: Router){}

    goBack(){
        this.router.navigate(["/useroverview"]);
    }
}