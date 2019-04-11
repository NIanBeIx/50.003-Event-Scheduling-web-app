import {Injectable} from '@angular/core';
import {Post} from '../Post';
import {Observable, of} from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class DataService {

  /** Post format day//time//location//instructor */
  /** 
   * {position: 0, title: 'Schedule One', course: '2019 ISTD - 50.003 : Elements of Software Construction', date_posted: new Date(), body: 'Body 1'},
    {position: 1, title: 'Schedule Two', course: '2019 ISTD - 50.003 : Elements of Software Construction', date_posted: new Date(), body: 'Body 2'},
    {position: 2, title: 'Schedule Three', course: '2019 ISTD - 50.003 : Elements of Software Construction', date_posted: new Date(), body: 'Body 3'},
   */


   firebaseGetName(){
    var namebyemail=firebase.firestore().collection('instructors').where('status','==',1).onSnapshot(queryshot=>{
      const articles=[]
      queryshot.forEach((doc)=>{
        console.log(doc.get('instructorName'))
        const iname=doc.get('instructorName');
        //firebase.firestore().collection('instructors').doc(iname).update({status:1});
        return iname;
      })
    })
   }


   firebaseGetLectures(instructorname:string){
     firebase.firestore().collection('instructors').doc(instructorname).collection('lectures').where('day','==','MONDAY').get().then(
       function(querySnapShot){
         querySnapShot.forEach(function(doc){
           console.log(doc.id,'=>',doc.data());
         });
       }
     );
   }

   ngOnInit(){
    
  }
   


  ELEMENT_DATA: Post[] = [
    {position: 0, day: 'Monday', time:'455',  venue: 'CC19', instructor: 'Sudipta', course: '50.003'},
    {position: 1, day: 'Monday', time:'3535',  venue: 'CC19', instructor: 'James', course: '50.003'},
    {position: 2, day: 'Monday', time:'2525',  venue: 'CC19', instructor: 'Letong', course: '50.003'},

  ]
  course = [
    {value: '50.003', viewValue: '2019 ISTD - 50.003 : Elements of Software Construction'},
    
  ];

  constructor() {
  }

  getData(): Observable<Post[]> {
    return of<Post[]>(this.ELEMENT_DATA);
  }

  getCourse() {
    return this.course;
  }

  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }


  dataLength() {
    return this.ELEMENT_DATA.length;
  }
}