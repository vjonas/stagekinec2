import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Program } from "app/models/program.model";
import { UserService } from "./user.service";

@Injectable()
export class ProgramService {
    path: string = "/users/traject"

    constructor(private af: AngularFire, private _userService: UserService) {
    }

    public createNewProgram(programName:string,uid:string,programId:number) {
        this.af.database.object('/users/'+uid+'/programs/'+programId).set({
            programId:programId,
            name:programName,
            score:0,
            exercises:null
        });
        this._userService.setCurrentProgram(programId, uid);
    }

    public addExerciseToProgram(exerciseId: string, uid: string, programId:number){
        this.af.database.object('/users/'+uid+"/programs/"+programId+"/exercises/"+exerciseId).set({
            exerciseId : exerciseId,
        });
    }

    public removeExerciseFromProgram(exerciseKey: string, uid: string, currentProgramId: number){
        this.af.database.object("/users/"+uid+"/programs/"+currentProgramId+"/exercises/"+exerciseKey).remove();
    }
}