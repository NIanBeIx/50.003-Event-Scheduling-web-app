import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schedulefrontend';

  ngOnInit(){

    var config = {
      apiKey: "AIzaSyCb6hfqnUUavhSOjuxPJ-pOTI_H4HOLKuw",
        authDomain: "login-6ce71.firebaseapp.com",
        databaseURL: "https://login-6ce71.firebaseio.com",
        projectId: "login-6ce71",
        storageBucket: "login-6ce71.appspot.com",
        messagingSenderId: "319730109584"
    };

    
    firebase.initializeApp(config);

    console.log("firebase initiated");
  }
}
