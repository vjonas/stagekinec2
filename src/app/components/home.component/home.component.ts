import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { routerTransition } from '../../animations/router.animations';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
})
export class HomeComponent {

    constructor(private router: Router) {
    }

    goToOverview() {
        this.router.navigate(["useroverview"]);
    }



}