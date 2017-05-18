import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/exercise.model";
import { Tutor } from "../models/tutor.model";

let contacts = [
    { id: 1, name: 'Pascal Precht', twitter: '@PascalPrecht' },
    { id: 2, name: 'Christoph Burgdorf', twitter: '@cburgdorf' },
    { id: 3, name: 'Thomas Burleson', twitter: '@thomasburleson' },
    { id: 4, name: 'Dominic Elm', twitter: '@elmd_' }
];

@Injectable()
export class UserService {
    path: string = "/users";
    mentorKey: any;

    constructor(private af: AngularFire) {
    }

    public getAllUsers(): Observable<User[]> {
        return this.af.database.list(this.path);
    }

    public getUserById(uid: string): Observable<User> {
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        }).map(res => { return res[0] });
    }

    public addMentorToUser(uidMentor: string, uidTutee: string) {        
        console.log(uidTutee);
        this.getUserById(uidTutee).subscribe(
            (user: User) => {
                this.af.database.object(this.path + "/" + user["$key"]).update({ mentorId: uidMentor });
            }
        )
    }

    public removeMentorFromUser(userKey: string) {
        this.af.database.object(this.path + "/" + userKey).update({ mentorId: 0 });
    }

    public getUsersFromMentor(uidMentor: string): Observable<User[]> {
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'mentorId',
                equalTo: uidMentor
            }
        });
    }

    public setCurrentProgram(programId: number, userKey: string) {
        this.af.database.object(this.path + "/" + userKey).update({ currentProgram: programId });
    }

}