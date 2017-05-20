import { Tutor } from './../models/tutor.model';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/exercise.model";

@Injectable()
export class MentorService {
    path: string = "/mentors"

    constructor(private af: AngularFire) {
    }

    public createMentor(mentorToAdd: Tutor) {
        this.af.database.object(this.path+"/"+mentorToAdd.uid).set(mentorToAdd)
    }

    public getMentorId(): string {
        return this.af.auth.getAuth().uid;
    }

}