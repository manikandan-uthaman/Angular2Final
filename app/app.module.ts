import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';

import { AppComponent }  from './app.component';
import { NavbarComponent }  from './shared/nav-bar.component';
import { routing } from './app.routing';

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
  providers: [HTTP_PROVIDERS],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }