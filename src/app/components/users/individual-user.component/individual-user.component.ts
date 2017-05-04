import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Traject } from '../../../models/traject.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'individualUser',
    templateUrl: 'individual-user.component.html',
    styleUrls: ['./individual-user.component.css'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class IndividualUserComponent implements OnInit {
    teller: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16];
    isCheckboxChecked: number = 0;
    uid: string;
    user : User;
    programList: Traject[];
    birthdate : any;
    age: number;

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

    ngOnInit(){
        this.route.params.subscribe(params => {
        this.uid = params['id']});
       this.userService.getUserById(this.uid).subscribe(user => {this.user = user[0];
       this.birthdate = new Date(this.user.birthdate);
       var timeDiff = Math.abs(Date.now() - this.birthdate);
       this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
       this.programList = user[0].traject;
        });
    }

    goBack() {
        this.router.navigate(["/useroverview"]);
    }

    changeCheckbox(checkbox: any) {
        if (checkbox.currentTarget.childNodes[1].checked == false) {
            checkbox.currentTarget.childNodes[1].checked = true;
            this.isCheckboxChecked++;
        }
        else {
            checkbox.currentTarget.childNodes[1].checked = false
            this.isCheckboxChecked--;
        }
    }

    deleteUser(){
        this.userService.deleteUserFromTutees(this.uid);
        this.router.navigate(["/useroverview"]);
    }
}