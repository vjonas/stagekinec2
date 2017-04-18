import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnChanges {

    constructor(private router: Router){

    }

    ngOnInit() { 
    }

    ngOnChanges(changes){
    }

    goToOverview(){
        this.router.navigate(["useroverview"]);
    }
  


}