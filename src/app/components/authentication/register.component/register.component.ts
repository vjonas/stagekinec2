import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
 
@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ["./register.component.css"]
})

export class RegisterComponent{
    
    constructor(public af: AngularFire, private router: Router){

    }
    
    onSubmit(formData){
        if(formData.valid){
            console.log(formData.value);
            this.af.auth.createUser({
                email: formData.value.email,
                password: formData.value.password
            }).then((success)=>{
                console.log(success);
                this.router.navigate(['/login'])
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
