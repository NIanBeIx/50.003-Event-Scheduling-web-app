import { Component, OnInit } from '@angular/core';



import {Router} from '@angular/router';

import {MatDialog} from '@angular/material';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/db-service';
import * as $ from "jquery"
import * as firebase from "firebase"
import * as angular from 'angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router: Router,private authservice:AuthService) { }


  ngOnInit() {

  }

  SuccessLoginRespond(){
    console.log("login successfully!");
    $("#loginErrorAlert").show();
    setTimeout(function(){
      var hre = "";
      location.href = hre;
    },2000);
  }

  login(email:string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password).then(
        response=>console.log("Login successfully")
    ).catch(

    );
}

  onSubmit( form: NgForm){
    const email=form.value.email;
    const passward=form.value.password;

    this.authservice.login(email,passward);
  }



}