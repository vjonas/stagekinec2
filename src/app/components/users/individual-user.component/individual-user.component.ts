import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';
import { UserService } from '../../../services/user.service';
import { ExerciseService } from '../../../services/exercise.service'
import { User } from '../../../models/user.model';
import { Program } from '../../../models/program.model';
import { FullExercise } from '../../../models/full.exercise.model'
import { Observable } from 'rxjs/Observable';
import { ProgramService } from "app/services/program.service";

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
    programList: Program[] = new Array<Program>();
    exerciseList: Array<FullExercise> = new Array<FullExercise>();
    birthdate: any;
    age: number;

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private exerciseService: ExerciseService, private _programService: ProgramService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.uid = params['id']
        });
        this.userService.getUserById(this.uid).subscribe(user => {
            this.user = user;
            this.birthdate = new Date(this.user.birthDate);
            var timeDiff = Math.abs(Date.now() - this.birthdate);
            this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
            /*var programKeys: Array<string> = new Array<string>();
            if (user.programs != undefined) {
                for (var i = 0; i < Object.keys(user.programs).length; i++) {
                    programKeys = user.programs[Object.keys(user.programs)[i]];
                    console.log(user.programs[Object.keys(user.programs)[i]])
                    var program: Program = new Program(user.programs[Object.keys(user.programs)[i]]["programId"], user.programs[Object.keys(user.programs)[i]]["name"], user.programs[Object.keys(user.programs)[i]]["score"], null);
                    console.log(program);
                    this.programList.push(program);
                }
            }*/
            //console.log(user.programs[key]["name"]);
            console.log(this.user.programs);
            this.programList = this.user.programs;
            console.log(this.programList);
            /*this.user.programs[0].excercises.forEach(ex => {
                this.exerciseService.getExcerciseById(ex.excerciseId).subscribe(
                    ex2 => {
                        console.log(ex2);
                        this.exerciseList.push(ex2[0]);
                    }
                )
            });*/
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

    onChangeProgram(newProgramId) {
        this.exerciseList.length = 0;
        this.user.programs[newProgramId].excercises.forEach(ex => {
            this.exerciseService.getExcerciseById(ex.excerciseId).subscribe(
                ex2 => {
                    console.log(ex2);
                    this.exerciseList.push(ex2[0]);
                }
            )
        });
    }

    createNewProgram(programName: string) {
        if (this.programList != undefined)
            this._programService.createNewProgram(programName, this.user["$key"], this.user.programs.length);
        else
            this._programService.createNewProgram(programName, this.user["$key"], 0);

    }
}