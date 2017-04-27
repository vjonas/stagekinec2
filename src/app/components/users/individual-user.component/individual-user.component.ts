import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideLeftTransition } from '../../../animations/router.animations';


@Component({
    selector: 'individualUser',
    templateUrl: 'individual-user.component.html',
    styleUrls: ['./individual-user.component.css'],
    animations: [slideLeftTransition()],
    host: { '[@routerTransition]': '' }
})

export class IndividualUserComponent {
    teller: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    isCheckboxChecked: number = 0;

    constructor(private router: Router) { }

    goBack() {
        this.router.navigate(["/useroverview"]);
    }

    changeCheckbox(checkbox: any) {
        console.log(checkbox.srcElement);
        if (checkbox.currentTarget.childNodes[1].checked == false) {
            checkbox.currentTarget.childNodes[1].checked = true;
            this.isCheckboxChecked++;
        }
        else {
            checkbox.currentTarget.childNodes[1].checked = false
            this.isCheckboxChecked--;
        }
    }
}