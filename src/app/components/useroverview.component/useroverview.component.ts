import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideRightTransition } from '../../animations/router.animations';

@Component({
    selector: 'userOverview',
    templateUrl: 'useroverview.component.html',
    styleUrls: ['./useroverview.component.css'],
    animations: [slideRightTransition()],
    host: {'[@routerTransition]':''}
})
export class UserOverviewComponent  {
    state: string = 'inactive';

    constructor(private router: Router){}

    ngOnInit() { 
    }

    ngOnChanges(changes){
    }

    goToUser(){
        console.log("ierse");
        this.router.navigate(['./individualuser']);
    }


}