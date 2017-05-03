import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { HomeComponent } from './components/home.component/home.component';
import { AppComponent } from './app.component';
import { LoginComponent} from './components/authentication/login.component/login.component';
import { UserOverviewComponent} from './components/users/user-overview.component/user-overview.component';
import { IndividualUserComponent } from './components/users/individual-user.component/individual-user.component';
import { RegisterComponent } from './components/authentication/register.component/register.component';
import { ResetPasswordComponent } from './components/authentication/reset-password.component/reset-password.component';
import { ResetConfirmationComponent} from './components/authentication/reset-confirmation.component/reset-confirmation.component';
import { ExerciseComponent } from './components/exercises/exercise.component/exercise.component';

import { AuthGuard } from './services/auth.service';
import { UserService } from './services/user.service';

// routes variabelen
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'useroverview', component: UserOverviewComponent, canActivate: [AuthGuard]},
  { path: 'individualuser/:id', component: IndividualUserComponent, canActivate: [AuthGuard]},
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'exercise', component: ExerciseComponent, canActivate:[AuthGuard]},
  { path: 'resetconfirmation', component: ResetConfirmationComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const firebaseConfig = {
  apiKey: "AIzaSyDt80FBi9Tver1DAEljAAhJKE7P8KR3EIA",
  authDomain: "stagekinect2.firebaseapp.com",
  databaseURL: "https://stagekinect2.firebaseio.com",
  projectId: "stagekinect2",
  storageBucket: "stagekinect2.appspot.com",
  messagingSenderId: "595627469769"
}

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, UserOverviewComponent, IndividualUserComponent, RegisterComponent, ResetPasswordComponent, ResetConfirmationComponent, ExerciseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes, { useHash: true }
    )
  ],
  //services
  providers: [ HashLocationStrategy, AuthGuard, UserService ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
