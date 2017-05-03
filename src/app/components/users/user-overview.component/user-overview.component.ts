import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs/Observable';

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

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        this.userService.getAllUsers().subscribe(users => {this.userList = users;});
                                            
    }

    goToUser(uid: string) {
       this.router.navigate(['./individualuser', uid]);
    }

    addTutee(uid: string){
        this.userService.getUserById(uid).subscribe(user => this.userList[this.userList.length]= user[0]);
    }


}