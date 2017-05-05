import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/exercise.model";
import { Tutor } from "../models/tutor.model";

@Injectable()
export class MentorService {
    path: string = "/mentors"

    constructor(private af: AngularFire) {
    }

    public createMentor(userData: any, uid: string) {
        this.af.database.list(this.path).push({
            uid: uid,
            name: userData.value.name,
            lastname: userData.value.lastname,
            email: userData.value.email,
            exercises: [],
        });
    }

}