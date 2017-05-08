import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';
import { UserService } from '../../../services/user.service';
import { ExerciseService } from '../../../services/exercise.service'
import { User } from '../../../models/user.model';
import { Traject } from '../../../models/traject.model';
import { FullExercise } from '../../../models/full.exercise.model'
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'individualUser',
    templateUrl: 'individual-user.component.html',
    styleUrls: ['./individual-user.component.scss'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class IndividualUserComponent implements OnInit {
    isCheckboxChecked: number = 0;
    uid: string;
    user: User;
    programList: Traject[];
    exerciseList: Array<FullExercise> = new Array<FullExercise>();
    birthdate: any;
    age: number;

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private exerciseService: ExerciseService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.uid = params['id']
        });
        this.userService.getUserById(this.uid).subscribe(user => {
            console.log(user);
            this.user = user;
            this.birthdate = new Date(this.user.birthdate);
            var timeDiff = Math.abs(Date.now() - this.birthdate);
            this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            this.programList = user.traject;
            this.user.traject[0].excercises.forEach(ex => {
                this.exerciseService.getExcerciseById(ex.excerciseid).subscribe(
                    ex2 => {
                        console.log(ex2);
                        this.exerciseList.push(ex2[0]);
                    }
                )
            });
        });
    }

    goBack() {
        this.router.navigate(["useroverview"]);
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

    deleteUser() {
        this.userService.removeMentorFromUser(this.uid);
        this.router.navigate(["useroverview"]);
    }

    onChangeProgram(newTrajectId) {
        this.exerciseList.length = 0;
        this.user.traject[newTrajectId].excercises.forEach(ex => {
            this.exerciseService.getExcerciseById(ex.excerciseid).subscribe(
                ex2 => {
                    console.log(ex2);
                    this.exerciseList.push(ex2[0]);
                }
            )
        });
    }
}