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
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        console.log("user login is: "+user.email);


        firebase.firestore().collection('instructors').where('email','==',user.email).get().then(
          sub=>{
            var returnList=[];
    
            sub.forEach(doc=>{
              const datas=doc.data();
              var itype=datas.type;
              if(itype=='instructor'){
                console.log("access denied");
                window.location.href='';

              }else{
                window.location.href='/generateschedule';
              }
            });
            });
          }
        });
  }


}
