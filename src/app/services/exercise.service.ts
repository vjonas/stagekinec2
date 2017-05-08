import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "../models/full.exercise.model";


@Injectable()
export class ExerciseService {
    path: string = "/excercises";

    constructor(private af: AngularFire) {
    }
    

    public getExcerciseById(excercise: string): Observable<FullExercise[]> {
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'excerciseid',
                equalTo: Number(excercise)
            }
        });
    }

    public createNewExcercise()
    {
        this.af.database.list(this.path).push({            
        });

    }
}