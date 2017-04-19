import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home.component/home.component';
import { AppComponent } from './app.component';
import { LoginComponent} from './login.component/login.component';
import { UserOverviewComponent} from './useroverview.component/useroverview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndividualUserComponent } from './individualuser.component/individualuser.component';
import { RegisterComponent } from './register.component/register.component';

// routes variabelen
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'useroverview', component: UserOverviewComponent},
  { path: 'individualuser', component: IndividualUserComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
  // PageNotFound { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, UserOverviewComponent, IndividualUserComponent, RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }
    )
  ],
  //services
  providers: [ HashLocationStrategy ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] // to clear the router-outlet test, else it fails
})
export class AppModule { }
