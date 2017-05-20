import { Tutor } from './../../../models/tutor.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { routerTransition } from '../../../animations/router.animations';
import { MentorService } from '../../../services/mentor.service';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ["./register.component.scss"],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class RegisterComponent {
    error: Error = new Error("");
    private mentorToAdd:Tutor = Tutor.createEmptyUser();

    constructor(public af: AngularFire, private router: Router, private mentorService: MentorService) {

    }

    onSubmit(formData) {
        if (formData.valid) {
            this.af.auth.createUser({
                email: formData.value.email,
                password: formData.value.password
            }).then((success) => {
                this.mentorToAdd.uid=success.uid;
                this.mentorService.createMentor(this.mentorToAdd);
                localStorage.setItem('currentUser', JSON.stringify({ uid: success.uid }));
                this.router.navigate(['/home'])
            }).catch((err) => {
                this.error = err;
            })
        }
    }
}
