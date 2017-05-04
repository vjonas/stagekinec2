import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from "../models/user.model";
import { Exercise } from "app/models/exercise.model";
import { Tutor } from "../models/tutor.model";

@Injectable()
export class UserService {
    addTutees: Observable<any[]>;
    deleteTutees: Observable<any[]>;
    addTuteeBool: boolean = true;
    mentorKey: any;

    constructor(private af: AngularFire) {
    }

    getAllUsers(): Observable<User[]> {
        return this.af.database.list('users');
    }

    getUserById(uid: string): Observable<User[]> {
        return this.af.database.list('users', {
            query: {
                orderByChild: 'uid',
                equalTo: uid
            }
        });
    }


    public createMentor(userData: any, uid: string) {
        this.af.database.list('/mentors').push({
            uid: uid,
            name: userData.value.name,
            lastname: userData.value.lastname,
            email: userData.value.email,
            exercises: [],
        });
    }

    public addTutee(uidMentor: string, uidTutee: string) {
        this.addTuteeBool = true;
        this.addTutees = this.af.database.list('/users', { preserveSnapshot: true });
        this.addTutees
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    if (snapshot.val().uid == uidTutee && this.addTuteeBool) {
                        this.af.database.list('/users').update(snapshot.key, { mentorId: uidMentor });
                        this.addTuteeBool = false;
                    }
                });
            })
    }

    public deleteUserFromTutees(uidTutee: string) {
        this.deleteTutees = this.af.database.list('/users', { preserveSnapshot: true });
        this.deleteTutees.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                if (snapshot.val().uid == uidTutee) {
                    this.af.database.list('/users').update(snapshot.key, { mentorId: 0 });
                }
            })
        })
    }

    public getTutees(uidMentor: string): Observable<User[]> {
        return this.af.database.list('users', {
            query: {
                orderByChild: 'mentorId',
                equalTo: uidMentor
            }
        });
    }

}