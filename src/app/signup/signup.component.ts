import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from 'app/db-service';
import * as firebase from "firebase";
import * as $ from "jquery";

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }



  successF(){
    $("#registerAlert").show();
    setTimeout(function(){
      $("#registerAlert").hide()

    },5000);  }

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
      response=>this.successF(),
       response=>this.connectionF()
    ).catch(
      error=>this.errorF()
    );
  }

  onSubmit( form: NgForm){
    const email=form.value.email;
    const passward=form.value.password;
 
    this.signUp(email,passward);

  }
}
