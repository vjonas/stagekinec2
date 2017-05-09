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
        /*this.af.database.list('/programs').push({
            programId:program.id,
            name:program.name,
            score:program.score,
            exercises:program.excercises
        });

        this.af.database.list('/users/'+uid+'/programs').push({
            programId:program.id,
            name:program.name,
            score:program.score,
            exercises:program.excercises
        });*/

        this.af.database.object('/users/'+uid+'/programs/'+programId).set({
            programId:"1",
            name:"program.name",
            score:"program.score",
            exercises:null
        });
    }

}