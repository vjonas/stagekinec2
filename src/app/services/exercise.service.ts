import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "../models/full.exercise.model";

@Injectable()
export class ExerciseService {
    path: string = "/exercises";
    private _mentorUid: string;

    constructor(private af: AngularFire) {
        this._mentorUid=JSON.parse(localStorage.getItem('currentUser')).uid;
    }


    public getExcerciseById(exerciseId: string): Observable<FullExercise> {
        return this.af.database.object(this.path+"/"+exerciseId);
    }

    public getAllExercisesFromMentor(): Observable<FullExercise[]> {
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'mentorUid',
                equalTo: JSON.parse(localStorage.getItem('currentUser')).uid
            }
        });
    }


    public createNewExcercise(exercise: FullExercise) {
        this.af.database.list(this.path).push({
            mentorUid:this._mentorUid,
            description: exercise.description,
            name: exercise.name,
            steps: exercise.steps
        });
    }
}