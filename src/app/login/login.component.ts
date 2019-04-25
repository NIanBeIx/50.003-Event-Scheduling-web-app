import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/db-service';
import * as $ from 'jquery'
import * as firebase from 'firebase'
import * as angular from 'angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router,private authservice:AuthService) { }


  ngOnInit() {}

  SuccessLoginRespond(email:string){
    $('#loginSucAlert').show()
    
    var namebyemail=firebase.firestore().collection('instructors').where('email','==',email).onSnapshot(queryshot=>{
      const articles=[]
      queryshot.forEach((doc)=>{
        console.log(doc.get('instructorName'))
        const iname=doc.get('instructorName');
        firebase.firestore().collection('instructors').doc(iname).update({status:1});
      })
    })
    
    console.log("login successfully!");
    setTimeout(function(){
      window.location.href = "/welcome";
    },2000);
  }

  errorR(){
    $('#loginErrorAlert').show();
    setTimeout(function(){
      $('#loginErrorAlert').hide();
    },1500);
  }

  login(email:string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password).then(
      response=>this.SuccessLoginRespond(email)
    ).catch(
      error=>this.errorR()
    );
  }



  onSubmit( form: NgForm){
    const email=form.value.email;
    const passward=form.value.password;


    this.login(email,passward);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        console.log("user login is: "+user.email);
        // ...
      } else {
      }
    });
  }
}