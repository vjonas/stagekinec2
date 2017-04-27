import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { routerTransition } from '../../../animations/router.animations';

@Component(
  {
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
    animations: [routerTransition()],
    host: { '[@routerTransition]': '' }
  }
)

export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  errCond: boolean = false;
  error: Error = new Error("");

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  ngOnInit() {

  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }, {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then((success) => {
          console.log(success);
          this.router.navigate(['/home']);
          this.errCond = false;
        }).catch((err) => {
          console.log(err);
          this.errCond = true;
          this.error = err;
        })
    }
  }

  providerLogin(from: string) {
    this.af.auth.login({
      provider: this._getProvider(from),
      method: AuthMethods.Popup,
    }).then((success) => {
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.log(err);
      this.error = err;
    })
  }

  private _getProvider(from: string) {
    switch (from) {
      case 'google': return AuthProviders.Google;
      case 'facebook': return AuthProviders.Facebook;
      case 'twitter': return AuthProviders.Twitter;
    }
  }

}