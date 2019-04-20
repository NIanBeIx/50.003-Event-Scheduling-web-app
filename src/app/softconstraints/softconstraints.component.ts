import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-softconstraints',
  templateUrl: './softconstraints.component.html',
  styleUrls: ['./softconstraints.component.css']
})
export class SoftconstraintsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  sendSoftConstraints(){ 
    var periods=[];
    console.log("soft constraints is sending");
    





    if ($('#MondayPeriod1').is(':checked')){periods.push('0 0');}
if ($('#MondayPeriod2').is(':checked')){periods.push('0 1');}
if ($('#MondayPeriod3').is(':checked')){periods.push('0 2');}
if ($('#MondayPeriod4').is(':checked')){periods.push('0 3');}
if ($('#MondayPeriod5').is(':checked')){periods.push('0 4');}
if ($('#MondayPeriod6').is(':checked')){periods.push('0 5');}
if ($('#MondayPeriod7').is(':checked')){periods.push('0 6');}
if ($('#MondayPeriod8').is(':checked')){periods.push('0 7');}
if ($('#MondayPeriod9').is(':checked')){periods.push('0 8');}
if ($('#MondayPeriod10').is(':checked')){periods.push('0 9');}
if ($('#MondayPeriod11').is(':checked')){periods.push('0 10');}
if ($('#MondayPeriod12').is(':checked')){periods.push('0 11');}
if ($('#MondayPeriod13').is(':checked')){periods.push('0 12');}
if ($('#MondayPeriod14').is(':checked')){periods.push('0 13');}
if ($('#MondayPeriod15').is(':checked')){periods.push('0 14');}
if ($('#MondayPeriod16').is(':checked')){periods.push('0 15');}
if ($('#MondayPeriod17').is(':checked')){periods.push('0 16');}
if ($('#MondayPeriod18').is(':checked')){periods.push('0 17');}
if ($('#MondayPeriod19').is(':checked')){periods.push('0 18');}
if ($('#MondayPeriod20').is(':checked')){periods.push('0 19');}
if ($('#MondayPeriod21').is(':checked')){periods.push('0 20');}
if ($('#MondayPeriod22').is(':checked')){periods.push('0 21');}
if ($('#MondayPeriod23').is(':checked')){periods.push('0 22');}
if ($('#TuesdayPeriod1').is(':checked')){periods.push('1 0');}
if ($('#TuesdayPeriod2').is(':checked')){periods.push('1 1');}
if ($('#TuesdayPeriod3').is(':checked')){periods.push('1 2');}
if ($('#TuesdayPeriod4').is(':checked')){periods.push('1 3');}
if ($('#TuesdayPeriod5').is(':checked')){periods.push('1 4');}
if ($('#TuesdayPeriod6').is(':checked')){periods.push('1 5');}
if ($('#TuesdayPeriod7').is(':checked')){periods.push('1 6');}
if ($('#TuesdayPeriod8').is(':checked')){periods.push('1 7');}
if ($('#TuesdayPeriod9').is(':checked')){periods.push('1 8');}
if ($('#TuesdayPeriod10').is(':checked')){periods.push('1 9');}
if ($('#TuesdayPeriod11').is(':checked')){periods.push('1 10');}
if ($('#TuesdayPeriod12').is(':checked')){periods.push('1 11');}
if ($('#TuesdayPeriod13').is(':checked')){periods.push('1 12');}
if ($('#TuesdayPeriod14').is(':checked')){periods.push('1 13');}
if ($('#TuesdayPeriod15').is(':checked')){periods.push('1 14');}
if ($('#TuesdayPeriod16').is(':checked')){periods.push('1 15');}
if ($('#TuesdayPeriod17').is(':checked')){periods.push('1 16');}
if ($('#TuesdayPeriod18').is(':checked')){periods.push('1 17');}
if ($('#TuesdayPeriod19').is(':checked')){periods.push('1 18');}
if ($('#TuesdayPeriod20').is(':checked')){periods.push('1 19');}
if ($('#TuesdayPeriod21').is(':checked')){periods.push('1 20');}
if ($('#TuesdayPeriod22').is(':checked')){periods.push('1 21');}
if ($('#TuesdayPeriod23').is(':checked')){periods.push('1 22');}
if ($('#WednesdayPeriod1').is(':checked')){periods.push('2 0');}
if ($('#WednesdayPeriod2').is(':checked')){periods.push('2 1');}
if ($('#WednesdayPeriod3').is(':checked')){periods.push('2 2');}
if ($('#WednesdayPeriod4').is(':checked')){periods.push('2 3');}
if ($('#WednesdayPeriod5').is(':checked')){periods.push('2 4');}
if ($('#WednesdayPeriod6').is(':checked')){periods.push('2 5');}
if ($('#WednesdayPeriod7').is(':checked')){periods.push('2 6');}
if ($('#WednesdayPeriod8').is(':checked')){periods.push('2 7');}
if ($('#WednesdayPeriod9').is(':checked')){periods.push('2 8');}
if ($('#WednesdayPeriod10').is(':checked')){periods.push('2 9');}
if ($('#WednesdayPeriod11').is(':checked')){periods.push('2 10');}
if ($('#WednesdayPeriod12').is(':checked')){periods.push('2 11');}
if ($('#WednesdayPeriod13').is(':checked')){periods.push('2 12');}
if ($('#WednesdayPeriod14').is(':checked')){periods.push('2 13');}
if ($('#WednesdayPeriod15').is(':checked')){periods.push('2 14');}
if ($('#WednesdayPeriod16').is(':checked')){periods.push('2 15');}
if ($('#WednesdayPeriod17').is(':checked')){periods.push('2 16');}
if ($('#WednesdayPeriod18').is(':checked')){periods.push('2 17');}
if ($('#WednesdayPeriod19').is(':checked')){periods.push('2 18');}
if ($('#WednesdayPeriod20').is(':checked')){periods.push('2 19');}
if ($('#WednesdayPeriod21').is(':checked')){periods.push('2 20');}
if ($('#WednesdayPeriod22').is(':checked')){periods.push('2 21');}
if ($('#WednesdayPeriod23').is(':checked')){periods.push('2 22');}
if ($('#ThursdayPeriod1').is(':checked')){periods.push('3 0');}
if ($('#ThursdayPeriod2').is(':checked')){periods.push('3 1');}
if ($('#ThursdayPeriod3').is(':checked')){periods.push('3 2');}
if ($('#ThursdayPeriod4').is(':checked')){periods.push('3 3');}
if ($('#ThursdayPeriod5').is(':checked')){periods.push('3 4');}
if ($('#ThursdayPeriod6').is(':checked')){periods.push('3 5');}
if ($('#ThursdayPeriod7').is(':checked')){periods.push('3 6');}
if ($('#ThursdayPeriod8').is(':checked')){periods.push('3 7');}
if ($('#ThursdayPeriod9').is(':checked')){periods.push('3 8');}
if ($('#ThursdayPeriod10').is(':checked')){periods.push('3 9');}
if ($('#ThursdayPeriod11').is(':checked')){periods.push('3 10');}
if ($('#ThursdayPeriod12').is(':checked')){periods.push('3 11');}
if ($('#ThursdayPeriod13').is(':checked')){periods.push('3 12');}
if ($('#ThursdayPeriod14').is(':checked')){periods.push('3 13');}
if ($('#ThursdayPeriod15').is(':checked')){periods.push('3 14');}
if ($('#ThursdayPeriod16').is(':checked')){periods.push('3 15');}
if ($('#ThursdayPeriod17').is(':checked')){periods.push('3 16');}
if ($('#ThursdayPeriod18').is(':checked')){periods.push('3 17');}
if ($('#ThursdayPeriod19').is(':checked')){periods.push('3 18');}
if ($('#ThursdayPeriod20').is(':checked')){periods.push('3 19');}
if ($('#ThursdayPeriod21').is(':checked')){periods.push('3 20');}
if ($('#ThursdayPeriod22').is(':checked')){periods.push('3 21');}
if ($('#ThursdayPeriod23').is(':checked')){periods.push('3 22');}
if ($('#FridayPeriod1').is(':checked')){periods.push('4 0');}
if ($('#FridayPeriod2').is(':checked')){periods.push('4 1');}
if ($('#FridayPeriod3').is(':checked')){periods.push('4 2');}
if ($('#FridayPeriod4').is(':checked')){periods.push('4 3');}
if ($('#FridayPeriod5').is(':checked')){periods.push('4 4');}
if ($('#FridayPeriod6').is(':checked')){periods.push('4 5');}
if ($('#FridayPeriod7').is(':checked')){periods.push('4 6');}
if ($('#FridayPeriod8').is(':checked')){periods.push('4 7');}
if ($('#FridayPeriod9').is(':checked')){periods.push('4 8');}
if ($('#FridayPeriod10').is(':checked')){periods.push('4 9');}
if ($('#FridayPeriod11').is(':checked')){periods.push('4 10');}
if ($('#FridayPeriod12').is(':checked')){periods.push('4 11');}
if ($('#FridayPeriod13').is(':checked')){periods.push('4 12');}
if ($('#FridayPeriod14').is(':checked')){periods.push('4 13');}
if ($('#FridayPeriod15').is(':checked')){periods.push('4 14');}
if ($('#FridayPeriod16').is(':checked')){periods.push('4 15');}
if ($('#FridayPeriod17').is(':checked')){periods.push('4 16');}
if ($('#FridayPeriod18').is(':checked')){periods.push('4 17');}
if ($('#FridayPeriod19').is(':checked')){periods.push('4 18');}
if ($('#FridayPeriod20').is(':checked')){periods.push('4 19');}
if ($('#FridayPeriod21').is(':checked')){periods.push('4 20');}
if ($('#FridayPeriod22').is(':checked')){periods.push('4 21');}
if ($('#FridayPeriod23').is(':checked')){periods.push('4 22');}
console.log(periods)

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
          if(datas.type=="instructor"){
            console.log("found active instructor  "+datas.instructorName);
            returnList.push(datas.instructorName);
            //return datas.instructorName;
          }else{
            console.log("error! course coordinator shouldn't be accessing this page!");
            //window.location.href='/poll'
          }
        });

        setTimeout(function(){
          firebase.firestore().collection('instructors').doc(returnList[0]).update({softConstraints:periods});
        },1000);






      });
  } else {
  }
});

  }

}
