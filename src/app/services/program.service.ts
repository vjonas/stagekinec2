import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Program } from "app/models/program.model";

@Injectable()
export class ProgramService {
    path: string = "/users/traject"

    constructor(private af: AngularFire) {
    }

    public createNewProgram(programName:string,uid:string,programId:number) {
        this.af.database.object('/users/'+uid+'/programs/'+programId).set({
            programId:programId,
            name:programName,
            score:0,
            exercises:null
        });
    }

    public addExerciseToProgram(exerciseId: string, uid: string, programId:number){
        console.log("addExerciseToProgram");
        console.log(exerciseId);
        console.log(uid);
        console.log(programId);
        this.af.database.object('/users/'+uid+"/programs/"+programId+"/exercises/"+exerciseId).set({
            exerciseId : exerciseId,
        });
    }

    public removeExerciseFromProgram(exerciseKey: string, uid: string, currentProgramId: number){
        console.log(exerciseKey);
        console.log(uid);
        console.log(currentProgramId);
        this.af.database.object("/users/"+uid+"/programs/"+currentProgramId+"/exercises/"+exerciseKey).remove();
        console.log("HAHAHAHAHA");
    }
}