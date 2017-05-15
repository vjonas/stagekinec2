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

    constructor(public af: AngularFire, private router: Router, private mentorService: MentorService) {

    }

    onSubmit(formData) {
        if (formData.valid) {
            this.af.auth.createUser({
                email: formData.value.email,
                password: formData.value.password
            }).then((success) => {
                this.mentorService.createMentor(formData, success.uid);
                localStorage.setItem('currentUser', JSON.stringify({ uid: success.uid }));
                this.router.navigate(['/home'])
            }).catch((err) => {
                this.error = err;
            })
        }
    }
}
