import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import {FlexLayoutModule} from '@angular/flex-layout';
import { PollComponent } from './poll/poll.component';
import { WelcomeComponent } from './welcome/welcome.component';

import {DataService} from './data/data.service';
import { MessagesComponent } from './messages/messages.component';
import { GeneratescheduleComponent } from './generateschedule/generateschedule.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { MatRadioModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    WelcomeComponent,
    MessagesComponent,
    GeneratescheduleComponent,
    LoginComponent,
    UserComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatRadioModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
