import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private user: String;
    name: any;

    constructor(public af: AngularFire, private router: Router) {
        this.af.auth.subscribe(
            auth => {
                if (auth) { this.name = auth; }
            }
        )
    }

    logout() {
        this.af.auth.logout();
        this.name = null;
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

}


