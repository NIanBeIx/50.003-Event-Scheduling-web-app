import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var namebyemail=firebase.firestore().collection('instructors').where('status','==',1).onSnapshot(queryshot=>{
      const articles=[]
      queryshot.forEach((doc)=>{
        console.log(doc.get('instructorName'))
        const iname=doc.get('instructorName');
        firebase.firestore().collection('instructors').doc(iname).update({status:0});
      })
    })
    console.log("successfully logout!");
  }

}
