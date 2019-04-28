import {Component, OnInit, Input} from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import * as $ from 'jquery';
import { post } from 'selenium-webdriver/http';
import { MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from 'ionic-angular';
import { BeforeScheduleDisplayComponent } from 'app/before-schedule-display/before-schedule-display.component';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit{


  tempelements:any[]=[];
  //elements: any=[];
  elements: any=[];
  
  constructor( private route:ActivatedRoute) {}
/*
  async onClickDownload(){
    const {Storage}=require('@google-cloud/storage');
    const storage=new Storage();
    const bucketName='escproject';
    const destFilename='C:/Desktop/schedule.xl';
    const srcFileName='schedule.xl';

    const options={
      destination:destFilename
    };

    await storage.bucketName(bucketName).file(srcFileName).download(options);
    
  }

  
*/



//return current login user name (check whether he/she is instructor)
 
  headElements = ['classNumber', 'cohortNumber', 'startTime','endTime','courseName','day','roomName','roomId'];


  ngOnInit(){
    

   // const {Storage} = require('@google-cloud/storage');

    this.route.queryParams.subscribe(
      
      params => {
        console.log(params);
        this.tempelements= params['item'];
      }
    );
    //console.log("!!!!!!!!!!! "+this.tempelements.length);
    console.log(BeforeScheduleDisplayComponent.elements);

    for(var i=0;i<BeforeScheduleDisplayComponent.elements.length;i++){
      this.elements.push(BeforeScheduleDisplayComponent.elements[i]);
      
    }
    console.log("gggggggggggggggggggggg "+this.elements.length);
    //console.log("there is element in the passed param");



  }
  onClickDownload(){
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
              const names=datas.instructorName;
              var listname=names.split(' ');
              if(listname.length>1){
                
                var base="https://storage.googleapis.com/escproject/"+listname[0]+"%20"+listname[1];
                window.location.href=base;
              }else{
                var base="https://storage.googleapis.com/escproject/"+listname[0];
                window.location.href=base;
              }
              
            });
          });
        }
      });
    
  }
}

