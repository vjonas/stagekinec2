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
    uid: string;
    user: User;
    programList: Program[] = new Array<Program>();
    currentProgramId: number = 0;
    userExerciseList: Array<FullExercise> = new Array<FullExercise>();
    mentorExerciseList: Array<FullExercise> = new Array<FullExercise>();
    exerciseToAdd: string;
    selectedExercise: FullExercise = null;

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private exerciseService: ExerciseService, private _programService: ProgramService) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.uid = params['id']
        });
        this.userService.getUserById(this.uid).subscribe(user => {
            this.user = user;
            this.user.age = Math.floor((Math.abs(Date.now() - <any>new Date(this.user.birthDate)) / (1000 * 3600 * 24)) / 365);
            this.programList = this.user.programs;
            this.exerciseService.getAllExercisesFromMentor().subscribe(exercises => { this.mentorExerciseList = exercises });
            if (this.user.programs != undefined && this.user.programs[0].exercises != undefined) {
                this.userExerciseList.length = 0;
                Object.keys(this.user.programs[0].exercises).forEach(ex => {
                    this.exerciseService.getExcerciseById(this.user.programs[0].exercises[ex].exerciseId).subscribe(
                        ex2 => {
                            this.userExerciseList.push(ex2);
                        }
                    )
                });
            }
        });
    }

    goBack() {
        this.router.navigate(["useroverview"]);
    }

    changeRadio(radio: any) {
        radio.currentTarget.childNodes[1].checked = true;
        this.exerciseToAdd = radio.currentTarget.childNodes[1].value;
    }

    deleteUser() {
        this.userService.removeMentorFromUser(this.user["$key"]);
        this.router.navigate(["useroverview"]);
    }

    setCurrentProgram(){
        this.userService.setCurrentProgram(this.currentProgramId, this.user["$key"]);
    }

    onChangeProgram(newProgramId) {
        this.userExerciseList.length = 0;
        this.currentProgramId = newProgramId;
        if (this.user.programs[newProgramId].exercises != null) {
            Object.keys(this.user.programs[newProgramId].exercises).forEach(ex => {
                this.exerciseService.getExcerciseById(this.user.programs[newProgramId].exercises[ex].exerciseId).subscribe(
                    ex2 => {
                        this.userExerciseList.push(ex2);
                    }
                )
            });
        }
    }

    createNewProgram(programName: string) {
        if (this.programList != undefined)
            this._programService.createNewProgram(programName, this.user["$key"], this.user.programs.length);
        else
            this._programService.createNewProgram(programName, this.user["$key"], 0);
    }

    addExerciseToUserProgram() {
        this._programService.addExerciseToProgram(this.exerciseToAdd, this.user["$key"], this.currentProgramId);
    }

    removeExerciseFromProgram(exerciseKey: string){
        this._programService.removeExerciseFromProgram(exerciseKey, this.user["$key"], this.currentProgramId);
    }

    setSelectedExercise(exercise: FullExercise){
        this.selectedExercise = exercise;
    }

    onNotify(message: string): void {
        this.selectedExercise = null;
    };
  }