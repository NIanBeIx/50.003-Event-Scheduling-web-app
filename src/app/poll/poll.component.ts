import {Component, OnInit, Input} from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { post } from 'selenium-webdriver/http';
import { MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit{


  tempelements:any[]=[];
  elements: any=[];
  
  constructor() {
    var insideelements=[];
    console.log("initiates! "+insideelements.length);
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
                  insideelements.push(a);
                  console.log("elements length "+insideelements.length);
                  rawList.push(a);
                  console.log(insideelements.length);
                })
              });
              //get rawList: lectures for the current login instructor
            });

            setTimeout(function(){
              console.log("outside length : "+insideelements.length);
              this.tempelements=insideelements;
              console.log("hhhhhhhhhhhhhhhhhhh "+this.tempelements.length);
              
              //$("#mytable").bootstrapTable('refresh',PollComponent.elements)
          },2000);

          //return returnList[0];
        },1000);
        
        
      });

  }


  

/*
/////////////////////////////////////////////////////////////////////////////////////////
// return array of objects (lectures) for the instructor
  firebaseGetLectures(instructorname:string){
    var raw=firebase.firestore().collection('instructors').doc(instructorname).collection('lectures').get().then(
      snapshot=>{
        var rawList=[];
        var count=0;
        snapshot.forEach(doc=>{
          const key=doc.id;
          firebase.firestore().collection('instructors').doc(instructorname).collection('lectures').doc(key).get().then(function(temp){
            const a=temp.data();
            rawList.push(a);
            console.log(a);
          })
        });

        setTimeout(resp=>{console.log(rawList);
        return rawList;},1000)
        
      });
  }


/////////////////////latest update
  findName(){
    firebase.firestore().collection('instructors').where('status','==',1).get().then(
      sub=>{
        var returnList=[];

        sub.forEach(doc=>{
          const datas=doc.data();
          if(datas.type=="instructor"){
            console.log("found active instructor  "+datas.instructorName);
            returnList.push(datas.instructorName);
            //return datas.instructorName;
            console.log(returnList.length+"  from inside");
          }else{
            console.log("error! course coordinator shouldn't be accessing this page!");
          }
        })
        setTimeout(function(){
          console.log("from outside  "+returnList[0]); 
          
          firebase.firestore().collection('instructors').doc(returnList[0]).collection('lectures').get().then(
            snapshot=>{
              var rawList=[];
              var count=0;
              snapshot.forEach(doc=>{
                const key=doc.id;
                firebase.firestore().collection('instructors').doc(returnList[0]).collection('lectures').doc(key).get().then(function(temp){
                  const a=temp.data();
                  rawList.push(a);
                  console.log(a);
                })
              });
              //get rawList: lectures for the current login instructor
              setTimeout(resp=>{console.log(rawList);
            },1000)
              
            });
          //return returnList[0];
        },1000);
        
        
      });
  }


  */
//return current login user name (check whether he/she is instructor)
 
  headElements = ['classNumber', 'cohortNumber', 'startPeriod', 'numberOfPeriods','courseName','day','roomName','roomId'];


  ngOnInit(){
    

    setTimeout(function(){
      for(var i=0;i<this.tempelements.length;i++){
        this.elements.push(this.tempelements[i]);
      }
      console.log("gggggggggggggggggggggg "+this.elements.length);
    },8000);

    

  }
}


