import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import {FormsModule} from '@angular/forms';

export interface Periods{
  value: string;
  viewValue: string;
}
export interface Venues{
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-generateschedule',
  templateUrl: './generateschedule.component.html',
  styleUrls: ['./generateschedule.component.css']
})


export class GeneratescheduleComponent implements OnInit {
  //selectedNumberOfPeriods: string;
  //selectedValue: string;
  periodNumber:'1';
  venueNumber:'1';

  private myMethod(event:any):void
{
   console.log("AAA");
   firebase.firestore().collection('algo').doc("algoStatus").set({status:"generate"});
   console.log("BBB");
   $('#generating').show();
  setTimeout(function(){$('#generating').hide();},2000);
}
  

  periods: Periods[]=[
    {value: '1', viewValue: '1 Period'},
    {value: '2', viewValue: '2 Periods'},
    {value: '3', viewValue: '3 Periods'},
    {value: '4', viewValue: '4 Periods'},
    {value: '5', viewValue: '5 Periods'}

  ]

  venues: Venues[]=[
    {value: '1', viewValue: 'location1'},
    {value: '2', viewValue: 'location2'},
    {value: '3', viewValue: 'location3'},
    {value: '4', viewValue: 'location4'},
    {value: '5', viewValue: 'location5'}

  ]

 

  ngOnInit() {

    
  }

  push(content:string){
        
    firebase.firestore().collection('courses').doc('2ndlayer').collection('3rdlayer').add({
        title:'user registered',
        value:{first:'hellohello',second:2}
    }
    );
    console.log("successfully pushed");
}

  onSubmit( form: NgForm){
    const courseID=form.value.courseId;
    const courseName=form.value.courseName;
    const instructors=form.value.instructorList;
    const periods=form.value.numberOfPeriod;
    const numberOfClass=form.value.numberOfCohort;
    const pillar=form.value.pillar;
    const lectures=form.value.lectureIndex;
    // const positionOfSharedLecture=form.value.positionOfSharedLecture

    var instructorArray=instructors.split(",");
    
    var periodArray=periods.split(",");
    var integerPeriod=new Array(periodArray.length);
    for(var i=0;i<periodArray.length;i++){
      integerPeriod[i]=parseInt(periodArray[i]);
    }


    var lecturea=lectures.split(",");
    var intLecture=new Array(lecturea.length);
    for(var i=0;i<lecturea.length;i++){
      intLecture[i]=parseInt(lecturea[i]);
    }

    var data={
      classPeriodList:integerPeriod,
      courseName:courseName,
      numberOfCohorts:numberOfClass,
      numberOfClasses:periodArray.length,
      professorList:instructorArray,
      courseId:courseID,
      pillarBatch:pillar,
      lectureIndexList:intLecture
    }



    

    firebase.firestore().collection('courses').doc(courseID).set(data);
    $('#added').show();
    setTimeout(function(){$('#added').hide();},2000);
    console.log("successfully updated database!");
  }

  
}