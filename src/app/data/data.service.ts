import {Injectable} from '@angular/core';
import {Post} from '../Post';
import {Observable, of} from 'rxjs';

@Injectable()
export class DataService {

  ELEMENT_DATA: Post[] = [
    {position: 0, title: 'Schedule One', course: '2019 ISTD - 50.003 : Elements of Software Construction', date_posted: new Date(), body: 'Body 1'},
    {position: 1, title: 'Schedule Two', course: '2019 ISTD - 50.003 : Elements of Software Construction', date_posted: new Date(), body: 'Body 2'},
    {position: 2, title: 'Schedule Three', course: '2019 ISTD - 50.003 : Elements of Software Construction', date_posted: new Date(), body: 'Body 3'},

  ];
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