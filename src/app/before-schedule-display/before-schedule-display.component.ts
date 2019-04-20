import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {NavController} from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PollComponent } from 'app/poll/poll.component';


@Component({
  selector: 'app-before-schedule-display',
  templateUrl: './before-schedule-display.component.html',
  styleUrls: ['./before-schedule-display.component.css']
})
export class BeforeScheduleDisplayComponent implements OnInit {
  static router: any;


  constructor(private router: Router
    ) {
      
    }
  static elements:any=[];

  static myEmail:any;
  ngOnInit() {
    var myrouter=this.router;
    var myEmail;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        BeforeScheduleDisplayComponent.myEmail=email;
        console.log("user login is: "+user.email);


        firebase.firestore().collection('instructors').where('email','==',user.email).get().then(
          sub=>{
            var returnList=[];
    
            sub.forEach(doc=>{
              const datas=doc.data();
              if(datas.type=="instructor"){
                console.log("found active instructor  "+datas.instructorName);
                returnList.push(datas.instructorName);
                //return datas.instructorName;
              }else{
                console.log("error! course coordinator shouldn't be accessing this page!");
                //window.location.href='/poll'
              }
            })
            setTimeout(function(){
              //console.log("from outside  "+returnList[0]); 
              firebase.firestore().collection('instructors').doc(returnList[0]).collection('lectures').get().then(
                snapshot=>{
                  var rawList=[]; 
                  var count=0;
                  snapshot.forEach(doc=>{
                    const key=doc.id;
                    firebase.firestore().collection('instructors').doc(returnList[0]).collection('lectures').doc(key).get().then(function(temp){
                      const a=temp.data();
                      //console.log("hhhhhhhhhhhhhhhhhhhhh "+a.get('classNumber'));
                      tempelements.push(a);
                      console.log("elements length "+tempelements.length);
                      rawList.push(a);
                      console.log(tempelements);
                    })
                  });
                  //get rawList: lectures for the current login instructor
                });
    
                setTimeout(function(){
                  
                BeforeScheduleDisplayComponent.elements=tempelements;
                console.log(BeforeScheduleDisplayComponent.elements);
                
              },3000);
    
            },1000);
          });
    
        setTimeout(function(){
          //window.location.href='/poll';
        },10000);





        // ...
      } 
    });
    console.log("outside email is: "+BeforeScheduleDisplayComponent.myEmail);

    var tempelements=[];
    
    

    


    setTimeout(function(){
      myrouter.navigate(['/poll'],{
        queryParams:{
          item:BeforeScheduleDisplayComponent.elements
        }
      });
      console.log("here are "+BeforeScheduleDisplayComponent.elements.length+" lectures")
    },10000);
    
    //var tempheadElements = ['classNumber', 'cohortNumber', 'startPeriod', 'numberOfPeriods','courseName','day','roomName','roomId'];
    
    

      
  }

}
