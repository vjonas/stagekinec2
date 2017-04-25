import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent{

    teller:number[]=[1,2,3,4,5,6]
    isCheckboxChecked:number=0;

    constructor(private router: Router){
    }

    changeCheckbox(checkbox:any){
        console.log(checkbox.srcElement);
        console.log(checkbox.currentTarget.childNodes[1]);
        if(checkbox.currentTarget.childNodes[1].checked==false){
        checkbox.currentTarget.childNodes[1].checked=true;
        this.isCheckboxChecked++;
    }
    else{
        checkbox.currentTarget.childNodes[1].checked=false
        this.isCheckboxChecked--;
    }
    }
}