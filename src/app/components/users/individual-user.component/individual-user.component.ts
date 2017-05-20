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
    private uid: string;
    private user: User;
    private programList: Program[] = new Array<Program>();
    private currentProgramId: number = 0;
    private userExerciseList: Array<FullExercise> = new Array<FullExercise>();
    private mentorExerciseList: Array<FullExercise> = new Array<FullExercise>();
    private exerciseToAdd: string;
    private selectedExercise: FullExercise = null;
    private programIdToShow:number;
    private loadCurrentProgramOfUserOnce:boolean=false;

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private exerciseService: ExerciseService, private _programService: ProgramService) { }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.uid = params['id']
        });
        this.loadUserData();

    }

    private loadUserData() {
        this.userService.getUserById(this.uid).subscribe((user: User) => {
            this.user = user;
            this.user.age = Math.floor((Math.abs(Date.now() - <any>new Date(this.user.birthDate)) / (1000 * 3600 * 24)) / 365);
            this.programList = this.user.programs;
            this.currentProgramId=this.user.currentProgram;
            if(!this.loadCurrentProgramOfUserOnce)
            {
                this.programIdToShow=this.user.currentProgram;
                this.loadCurrentProgramOfUserOnce=true;
            }
            this.exerciseService.getAllExercisesFromMentor().subscribe((exercises: FullExercise[]) => { this.mentorExerciseList = exercises });
            if (this.user.programs != undefined && this.user.programs[this.programIdToShow].exercises != undefined) {
                this.userExerciseList.length = 0;
                Object.keys(this.user.programs[this.programIdToShow].exercises).forEach(ex => {
                    this.exerciseService.getExcerciseById(this.user.programs[this.programIdToShow].exercises[ex].exerciseId).subscribe(
                        ex2 => {
                            this.userExerciseList.push(ex2);
                        }
                    )
                });
            }
        });
    }

    private goBack() {
        this.router.navigate(["useroverview"]);
    }

    private changeRadio(radio: any) {
        radio.currentTarget.childNodes[1].checked = true;
        this.exerciseToAdd = radio.currentTarget.childNodes[1].value;
    }

    private deleteUser() {
        this.userService.removeMentorFromUser(this.user.uid);
        this.router.navigate(["useroverview"]);
    }

    private setCurrentProgram() {
        this.userService.setCurrentProgram(this.programIdToShow, this.user.uid);
    }

    private onChangeProgram(newProgramId) {
        this.userExerciseList.length = 0;
        this.programIdToShow=newProgramId;
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

    private createNewProgram(programName: string) {
        var newProgramToAdd:Program=Program.createEmptyProgram();
        newProgramToAdd.name=programName;        
        if (this.programList != undefined)
        {
            newProgramToAdd.programId=this.user.programs.length;
        }
        else
        {
            newProgramToAdd.programId=0;
        }
            this._programService.createNewProgram(newProgramToAdd, this.user.uid);        
    }

    private addExerciseToUserProgram() {
        this._programService.addExerciseToProgram(this.exerciseToAdd, this.user.uid, this.programIdToShow);
    }

    private removeExerciseFromProgram(exerciseKey: string) {
        this._programService.removeExerciseFromProgram(exerciseKey, this.user.uid, this.programIdToShow);
    }

    private setSelectedExercise(exercise: FullExercise) {
        this.selectedExercise = exercise;
    }

    onNotify(message: string): void {
        this.selectedExercise = null;
    };
}