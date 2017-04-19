import { Component } from '@angular/core';

@Component(
  {
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss']
  }
)

export class LoginComponent{
  invalidLogin: boolean;

  constructor() {
  }

  public login() {
      console.log("logged in");
  }

  
}