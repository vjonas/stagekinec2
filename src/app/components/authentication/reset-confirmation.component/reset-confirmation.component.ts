import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';



@Component({
    selector: 'resetconfirmation',
    templateUrl: './reset-confirmation.component.html',
    styleUrls: ["./reset-confirmation.component.scss"],
    animations: [routerTransition()],
    host: {'[@routerTransition]':''}
})

export class ResetConfirmationComponent{
    constructor(private router: Router){

    }

    okButtonClicked(){
        this.router.navigate(['/login']);
    }
}