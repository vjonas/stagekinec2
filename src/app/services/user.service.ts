import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/exercise.model";
import { Tutor } from "../models/tutor.model";

@Injectable()
export class UserService {
    path: string = "/users";
    mentorKey: any;

    constructor(private af: AngularFire) {
    }

    public getAllUsers(): Observable<User[]> {
        return this.af.database.list(this.path);
    }

    public getUserById(uid: string): Observable<User[]> {
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        });
    }

    public addMentorToUser(uidMentor: string, uidTutee: string) {
        var addTuteeBool = true;
        var addTutees = this.af.database.list(this.path, { preserveSnapshot: true });
        addTutees
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    if (snapshot.val().uid == uidTutee && addTuteeBool) {
                        this.af.database.list(this.path).update(snapshot.key, { mentorId: uidMentor });
                        addTuteeBool = false;
                    }
                });
            })
    }

    public removeMentorFromUser(uidTutee: string) {
        var deleteTutees = this.af.database.list(this.path, { preserveSnapshot: true });
        deleteTutees.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                if (snapshot.val().uid == uidTutee) {
                    this.af.database.list(this.path).update(snapshot.key, { mentorId: 0 });
                }
            })
        })
    }

    public getUsersFromMentor(uidMentor: string): Observable<User[]> {
        return this.af.database.list(this.path, {
            query: {
                orderByChild: 'mentorId',
                equalTo: uidMentor
            }
        });
    }

}