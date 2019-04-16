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
import { MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule, MatTableDataSource, MatIconModule } from '@angular/material';
import {AuthService} from './db-service';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logoutPage/logout/logout.component';
import { DisplayComponent } from './display/display.component';
import { WaitingPageComponent } from './waiting-page/waiting-page.component';
import {TableModule} from '../../node_modules/angular-bootstrap-md'
import {IconsModule} from '../../node_modules/angular-bootstrap-md'
import { BeforeScheduleDisplayComponent } from './before-schedule-display/before-schedule-display.component';
import { SoftconstraintsComponent } from './softconstraints/softconstraints.component';


@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    WelcomeComponent,
    MessagesComponent,
    GeneratescheduleComponent,
    LoginComponent,
    UserComponent,
    SignupComponent,
    LogoutComponent,
    DisplayComponent,
    WaitingPageComponent,
    BeforeScheduleDisplayComponent,
    SoftconstraintsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    TableModule,
    MatIconModule,
    IconsModule

  ],
  providers: [DataService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
