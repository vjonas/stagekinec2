import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'userOverview',
    templateUrl: 'useroverview.component.html',
    styleUrls: ['./useroverview.component.css']
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