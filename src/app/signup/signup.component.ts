import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from 'app/db-service';
import * as firebase from "firebase";
import * as $ from "jquery";
import { DataService } from 'app/data/data.service';
import { Observable } from 'rxjs';
import { Post } from 'app/Post';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }



  successF(){
    $("#registerAlert").show();
    setTimeout(function(){
      window.location.href = "/login";

    },2000);  }

  connectionF(){
    $("#connectionAlert").show();
    setTimeout(function(){
      $("#connectionAlert").hide()

    },2000);  }

  errorF(){
    $("#connectionAlert").show();
    setTimeout(function(){
      $("#registerFailAlert").hide()

    },2000);
  }

  
  signUp(email:string,password:string){
    firebase.auth().createUserWithEmailAndPassword(email,password).then(
      response=>this.successF()
    ).catch(
      error=>this.errorF()
    );
  }

  onSubmit( form: NgForm){
    const email=form.value.email;
    const passward=form.value.password;
    const name=form.value.name;
    const t=form.value.type;
 
    this.signUp(email,passward);
    firebase.firestore().collection('instructors').doc(name).set({
      instructorName:name,
      email:email,
      passward:passward,
      status:0,
      type:t
    })
  }
}
