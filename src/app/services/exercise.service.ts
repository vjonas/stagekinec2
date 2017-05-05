import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "../models/full.exercise.model";


@Injectable()
export class ExerciseService {

    constructor(private af: AngularFire) {
    }
    

    getExcerciseById(excercise: string): Observable<FullExercise[]> {
        return this.af.database.list('excercises', {
            query: {
                orderByChild: 'excerciseid',
                equalTo: Number(excercise)
            }
        });
    }
}