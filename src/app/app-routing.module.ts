import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {PollComponent} from './poll/poll.component';
import {MessagesComponent} from './messages/messages.component';
import {GeneratescheduleComponent} from './generateschedule/generateschedule.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'poll', component: PollComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'generateschedule', component: GeneratescheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
