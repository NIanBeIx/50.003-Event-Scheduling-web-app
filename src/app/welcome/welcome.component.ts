import { Component, OnInit } from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import { checkAndUpdateElementInline } from '@angular/core/src/view/element';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  displayedColumns = ['day', 'time', 'venue', 'instructor','course'];

  constructor() { }

  sendMessage() { }

  ngOnInit() {
    //var sth=this.firebaseGetLectures('Tony Quek');


    const instructorname='Tony Quek';
    var rawList=[];
    var raw=firebase.firestore().collection('instructors').doc(instructorname).collection('lectures').get().then(
      snapshot=>{
        //var rawList=[];
        var count=0;
        snapshot.forEach(doc=>{
          const key=doc.id;
          firebase.firestore().collection('instructors').doc(instructorname).collection('lectures').doc(key).get().then(function(temp){
            const a=temp.data();
            rawList.push(a);
            console.log(a);
          })
        });

        //setTimeout(resp=>{console.log(rawList);return rawList;},1000)
        
      }
    );
    console.log("!!!!!!!!!!!!!!!!1 "+rawList.length);
  }

  
  firebaseinstructorName(){
    var namebyemail=firebase.firestore().collection('instructors').where('status','==',1).onSnapshot(queryshot=>{
      const articles=[]
      if(queryshot.size==0){
        window.location.href='/generateschedule';
      }
      queryshot.forEach((doc)=>{
        if(doc.exists){
          console.log(doc.get('type'))
          const itype=doc.get('type');
        //firebase.firestore().collection('instructors').doc(iname).update({status:1});
          if(itype=='instructor'){

            //window.location.href='/display';
          }else{
            //window.location.href='/generateschedule';
          }
        }else{
          //window.location.href='/generateschedule';
        }
        
      })
    })
  
  }


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
        
      }
    );

  }


GetObject(snapshot){
  var returnArray=[];

  snapshot.forEach(function (childSnapshot){
    var item=childSnapshot.val();
    item.key=childSnapshot.key;
    returnArray.push(item)
  });
  return returnArray;

}





}
export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }
  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }
  disconnect(){
    
  }
}

