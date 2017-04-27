import { Component, Inject } from '@angular/core';
import { AngularFire, FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations'


@Component({
    selector: 'resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ["./resetpassword.component.css"],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})

export class ResetPasswordComponent {
    private auth: any;
    errCond = false;
    error: Error = new Error("");

    constructor(private af: AngularFire, @Inject(FirebaseApp) fa: any,
        private router: Router) {
        this.auth = fa.auth();
    }

    onSubmit(formData) {
        console.log(formData.value);
        this.auth.sendPasswordResetEmail(formData.value.email)
            .then((success) => {
                console.log(success);
                this.router.navigate(['/resetconfirmation']);
                this.errCond = false;
            }).catch((err) => {
                console.log(err);
                this.errCond = true;
                this.error = err;
            })
    }

}