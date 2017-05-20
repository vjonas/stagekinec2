import { Program } from './../models/program.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { UserService } from "./user.service";

@Injectable()
export class ProgramService {
    path: string = "/users/traject"

    constructor(private af: AngularFire, private _userService: UserService) {
    }

    public createNewProgram(newProgramToAdd: Program, userId: string) {
        this.af.database.object('/users/' + userId + '/programs/' + newProgramToAdd.programId).set(newProgramToAdd);
        //this._userService.setCurrentProgram(newProgramToAdd.programId, userId);
    }

    public addExerciseToProgram(exerciseId: string, userId: string, programId: number) {
        this.af.database.object('/users/' + userId + "/programs/" + programId + "/exercises/" + exerciseId).set({
            exerciseId: exerciseId,
        });
    }

    public removeExerciseFromProgram(exerciseId: string, userId: string, currentProgramId: number) {
        this.af.database.object("/users/" + userId + "/programs/" + currentProgramId + "/exercises/" + exerciseId).remove();
    }
}