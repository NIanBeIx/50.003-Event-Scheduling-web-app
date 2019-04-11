import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-before-schedule-display',
  templateUrl: './before-schedule-display.component.html',
  styleUrls: ['./before-schedule-display.component.css']
})
export class BeforeScheduleDisplayComponent implements OnInit {


  myrouter: Router;
  constructor(private router: Router) { 
    this.myrouter=router;
  }

  

  ngOnInit() {
    var tempelements=[];
    var tempheadElements = ['classNumber', 'cohortNumber', 'startPeriod', 'numberOfPeriods','courseName','day','roomName','roomId'];


    firebase.firestore().collection('instructors').where('status','==',1).get().then(
      sub=>{
        var returnList=[];

        sub.forEach(doc=>{
          const datas=doc.data();
          if(datas.type=="instructor"){
            console.log("found active instructor  "+datas.instructorName);
            returnList.push(datas.instructorName);
            //return datas.instructorName;
            //console.log(returnList.length+"  from inside");
          }else{
            console.log("error! course coordinator shouldn't be accessing this page!");
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
                  tempelements.push(a);
                  console.log("elements length "+tempelements.length);
                  rawList.push(a);
                  console.log(tempelements.length);
                })
              });
              //get rawList: lectures for the current login instructor
            });

            setTimeout(function(){
              console.log("outside length : "+tempelements.length);
              this.myrouter.navigate(['poll'], {
                queryParams: {
                  head: tempheadElements,
                  content: tempelements
                }
            });
              //$("#mytable").bootstrapTable('refresh',PollComponent.elements)
          },1000);

          //return returnList[0];
        },1000);
        
        
      });

      

  }

}
