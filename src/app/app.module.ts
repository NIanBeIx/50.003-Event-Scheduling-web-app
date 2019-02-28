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


@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    WelcomeComponent,
    MessagesComponent,
    GeneratescheduleComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
