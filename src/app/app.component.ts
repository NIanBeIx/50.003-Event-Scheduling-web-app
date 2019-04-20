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

  loginCondition(){
    console.log("nobody login");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("already logged in"); 
        $('#blockLoginAlert').show();
        setTimeout(function(){$('#blockLoginAlert').hide();},2000);
      }else{
        console.log("has not login");
        window.location.href='/login';
      }
    });
  }

  signupCondition(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("already logged in"); 
        $('#blockSignupAlert').show();
        setTimeout(function(){$('#blockSignupAlert').hide();},2000);
      }else{
        console.log("has not login");
        window.location.href='/signup';
      }
    });
  }


  msgCondition(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        console.log("user login is: "+user.email);
        

        firebase.firestore().collection('instructors').where('email','==',user.email).get().then(
          sub=>{
    
            sub.forEach(doc=>{
              const datas=doc.data();
              if(datas.type=="instructor"){
                $('#blockMSGAlert').show();
                setTimeout(function(){$('#blockMSGAlert').hide();},2000);
              }else{
                console.log("error! course coordinator shouldn't be accessing this page!");
                window.location.href='/message'
              }
            });
          });
        }else{
          $('#plslogin').show();
          setTimeout(function(){$('#plslogin').hide();},2000);
        }
      });
    }



    generateCondition(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var email = user.email;
          console.log("user login is: "+user.email);
          
  
          firebase.firestore().collection('instructors').where('email','==',user.email).get().then(
            sub=>{
      
              sub.forEach(doc=>{
                const datas=doc.data();
                if(datas.type=="instructor"){
                  $('#blockGenerateAlert').show();
                  setTimeout(function(){$('#blockGenerateAlert').hide();},2000);
                }else{
                  window.location.href='/waiting'
                }
              });
            });
          }else{
            $('#plslogin').show();
            setTimeout(function(){$('#plslogin').hide();},2000);
          }
        });
      }



      logoutCondition(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log("already logged in"); 
            window.location.href='/logout';

          }else{
            console.log("has not login");
            $('#plslogin').show();
            setTimeout(function(){$('#plslogin').hide();},2000);
          }
        });
      }



      viewCondition(){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var email = user.email;
            console.log("user login is: "+user.email);
            
    
            firebase.firestore().collection('instructors').where('email','==',user.email).get().then(
              sub=>{
        
                sub.forEach(doc=>{
                  const datas=doc.data();
                  if(datas.type=="instructor"){
                    window.location.href='/beforeschedule'
                  }else{
                    $('#blockGenerateAlert').show();
                    setTimeout(function(){$('#blockGenerateAlert').hide();},2000);
                  }
                });
              });
            }else{
              $('#plslogin').show();
              setTimeout(function(){$('#plslogin').hide();},2000);
            }
          });
        }

        softCondition(){
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              var email = user.email;
              console.log("user login is: "+user.email);
              
      
              firebase.firestore().collection('instructors').where('email','==',user.email).get().then(
                sub=>{
          
                  sub.forEach(doc=>{
                    const datas=doc.data();
                    if(datas.type=="instructor"){
                      window.location.href='/softconstraints'
                    }else{
                      $('#blockGenerateAlert').show();
                      setTimeout(function(){$('#blockGenerateAlert').hide();},2000);
                    }
                  });
                });
              }else{
                $('#plslogin').show();
                setTimeout(function(){$('#plslogin').hide();},2000);
              }
            });
          }


        


  
}
