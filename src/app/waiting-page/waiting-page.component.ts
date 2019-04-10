import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.css']
})
export class WaitingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var namebyemail=firebase.firestore().collection('instructors').where('status','==',1).onSnapshot(queryshot=>{
      const articles=[]
      queryshot.forEach((doc)=>{
        console.log(doc.get('type'))
        const itype=doc.get('type');
        //firebase.firestore().collection('instructors').doc(iname).update({status:1});
        if(itype=='instructor'){
          window.location.href='/display';
        }else{
          window.location.href='/generateschedule';
        }
      })
    })
  }

}
