import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {PollComponent} from './poll/poll.component';
import {MessagesComponent} from './messages/messages.component';
import {GeneratescheduleComponent} from './generateschedule/generateschedule.component';
import {LoginComponent} from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logoutPage/logout/logout.component';
import { DisplayComponent } from './display/display.component';
import { WaitingPageComponent } from './waiting-page/waiting-page.component';
import { BeforeScheduleDisplayComponent } from './before-schedule-display/before-schedule-display.component';

// links between the websites


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'poll', component: PollComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'generateschedule', component: GeneratescheduleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'logout',component:LogoutComponent},
  {path: 'display',component:DisplayComponent},
  {path: 'waiting',component:WaitingPageComponent},
  {path: 'beforeschedule',component:BeforeScheduleDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }