import { MentorService } from './mentor.service';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { FullExercise } from "../models/full.exercise.model";

@Injectable()
export class ExerciseService {
    path: string = "/exercises";

    constructor(private af: AngularFire,private mentorService:MentorService) {
    }


    public getExcerciseById(exerciseId: string): Observable<FullExercise> {
        return this.af.database.object(this.path+"/"+exerciseId);
    }

    public getAllExercisesFromMentor(): Observable<FullExercise[]> {
        var mentorId=this.mentorService.getMentorId();
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'mentorUid',
                equalTo: mentorId
            }
        });
    }


    public createNewExcercise(exercise: FullExercise) {
        var mentorId=this.mentorService.getMentorId();        
        this.af.database.list(this.path).push({
            mentorUid:mentorId,
            description: exercise.description,
            name: exercise.name,
            steps: exercise.steps
        });
    }
}