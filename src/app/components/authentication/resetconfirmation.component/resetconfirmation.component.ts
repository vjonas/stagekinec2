import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'resetconfirmation',
    templateUrl: './resetconfirmation.component.html',
    styleUrls: ["./resetconfirmation.component.css"]
})

export class ResetConfirmationComponent{
    constructor(private router: Router){

    }

    okButtonClicked(){
        this.router.navigate(['/login']);
    }
}