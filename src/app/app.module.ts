import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home.component/home.component';
import { AppComponent } from './app.component';
import { LoginComponent} from './login.component/login.component';

// routes variabelen
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  /*{ path: 'register', component: RegisterComponent },
  { path: 'room/:id', component: RoomComponent },*/
  { path: 'login', component: LoginComponent },
 /* { path: 'public-rooms', component: PublicRoomsComponent },
  { path: 'login', component: LoginComponent },*/
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  // PageNotFound { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }) //

  ],
  //services
  providers: [ HashLocationStrategy ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ] // to clear the router-outlet test, else it fails
})
export class AppModule { }
