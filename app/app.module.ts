import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {AuthService} from './login/auth-user.component';

import { AppComponent }  from './app.component';
import { NavbarComponent }  from './shared/nav-bar.component';
import { routing } from './app.routing';
import {ConfirmDeactivateComponent} from './confirm-deactivate.component';

@NgModule({
  imports: [ 
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    routing ],
  declarations: [ 
    AppComponent,
    NavbarComponent
    ],
  providers: [HTTP_PROVIDERS, ConfirmDeactivateComponent, AuthService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }