import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {PollComponent} from './poll/poll.component';
import {MessagesComponent} from './messages/messages.component';
import {GeneratescheduleComponent} from './generateschedule/generateschedule.component';
import {LoginComponent} from './login/login.component';

// links between the websites


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'poll', component: PollComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'generateschedule', component: GeneratescheduleComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
