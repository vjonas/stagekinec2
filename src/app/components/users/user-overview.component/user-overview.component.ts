import { MentorService } from './../../../services/mentor.service';
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
    styleUrls: ['./user-overview.component.scss'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})
export class UserOverviewComponent implements OnInit {
    state: string = 'inactive';
    userList: User[];
    tutor: User;
    mentorUid: string;
    userNotFound: boolean = false;


    constructor(private router: Router, private userService: UserService,private mentorService:MentorService) { }

    ngOnInit() {
        this.loadMentorData();
    }

    private goToUser(uid: string) {
        this.router.navigate(['individualuser', uid]);
    }
    

    private addUser(uid: string) {
        this.userService.addMentorToUser(this.mentorUid, uid).subscribe(bool => this.userNotFound = bool);
    }

    private loadMentorData(){
        this.mentorUid = this.mentorService.getMentorId();
        this.userService.getUsersFromMentor(this.mentorUid).subscribe(users => {
        this.userList = users;
            this.userList.forEach(user => user.age = Math.floor(((Math.abs(Date.now() - <any>(new Date(user.birthDate)))) / (1000 * 3600 * 24)) / 365))
        });
    }
}