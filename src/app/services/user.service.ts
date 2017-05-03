import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/exercise.model";

@Injectable()
export class UserService {
    
    constructor(private af: AngularFire){
    }

    getAllUsers(): Observable<User[]>{
        return this.af.database.list('users');
    }

    getUserById(uid: string):Observable<User[]>{
        return this.af.database.list('users', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        });
    }


    public createMentor(userData: any, uid: string) {
        console.log('in create mentor');
        this.af.database.list('/mentors').push({
            uid: uid,
            name: userData.value.name,
            lastname: userData.value.lastname,
            email: userData.value.email,
            exercises: [],
            tutees: []
        });
    }

}