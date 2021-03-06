import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { CompletedExercise } from '../models/completedExercise.model';

@Injectable()
export class CompletedExerciseService {
    private path: string = "/completed-exercises" 

     constructor(private af: AngularFire){}

    getCompletedExercisesByUser(userId: string, programId: number, exerciseId: string): Observable<CompletedExercise[]>{
      return  this.af.database.list(this.path+"/"+userId+"/"+programId,{
            query: {
                orderByChild: 'exerciseId',
                equalTo: exerciseId
            }
        });
    }

}