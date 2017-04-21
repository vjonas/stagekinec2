import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home.component/home.component';
import { AppComponent } from './app.component';
import { LoginComponent} from './components/authentication/login.component/login.component';
import { UserOverviewComponent} from './components/useroverview.component/useroverview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndividualUserComponent } from './components/individualuser.component/individualuser.component';
import { RegisterComponent } from './components/authentication/register.component/register.component';
import { AngularFireModule } from 'angularfire2';
import { AuthGuard } from './services/auth.service';
import { ResetPasswordComponent } from './components/authentication/resetpassword.component/resetpassword.component';
import { ResetConfirmationComponent} from './components/authentication/resetconfirmation.component/resetconfirmation.component';

// routes variabelen
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'useroverview', component: UserOverviewComponent, canActivate: [AuthGuard]},
  { path: 'individualuser', component: IndividualUserComponent, canActivate: [AuthGuard]},
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'resetconfirmation', component: ResetConfirmationComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // PageNotFound { path: '**', component: PageNotFoundComponent }
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
    AppComponent, HomeComponent, LoginComponent, UserOverviewComponent, IndividualUserComponent, RegisterComponent, ResetPasswordComponent, ResetConfirmationComponent
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
  providers: [ HashLocationStrategy, AuthGuard ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] // to clear the router-outlet test, else it fails
})
export class AppModule { }
