import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Tutor } from '../../../models/tutor.model'

@Component({
    selector: 'userOverview',
    templateUrl: 'user-overview.component.html',
    styleUrls: ['./user-overview.component.css'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})
export class UserOverviewComponent implements OnInit{
    state: string = 'inactive';
    userList : User[];
    tutor: User;
    mentorUid: string;

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
       this.mentorUid = JSON.parse(localStorage.getItem('currentUser')).uid;
       this.userService.getTutees(this.mentorUid).subscribe(users => {this.userList = users;
                                                this.userList.forEach(user => user.age = Math.floor(((Math.abs(Date.now() - <any>(new Date(user.birthdate)))) / (1000 * 3600 * 24))/365))});
    }

    goToUser(uid: string) {
       this.router.navigate(['./individualuser', uid]);
    }

    addTutee(uid: string){
        this.userService.addTutee(this.mentorUid, uid);
    }
}