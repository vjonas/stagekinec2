import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideRightTransition } from '../../../animations/router.animations';

@Component({
    selector: 'userOverview',
    templateUrl: 'user-overview.component.html',
    styleUrls: ['./user-overview.component.css'],
    animations: [slideRightTransition()],
    host: { '[@routerTransition]': '' }
})
export class UserOverviewComponent {
    state: string = 'inactive';

    constructor(private router: Router) { }

    ngOnInit() {
    }

    ngOnChanges(changes) {
    }

    goToUser() {
        this.router.navigate(['./individualuser']);
    }


}