import { Component } from '@angular/core';

@Component({
  selector: 'app-generateschedule',
  templateUrl: './generateschedule.component.html',
  styleUrls: ['./generateschedule.component.css']
})
export class GeneratescheduleComponent {
  selectedLevel;
  data:Array<Object> =[
      {id: 0, hours: "1 hour"},
      {id: 1, hours: "2 hours"},
      {id: 2, hours: "3 hours"},
      {id: 3, hours: "4 hours"},

  ];

  selected(){
    console.log(this.selectedLevel.hours)
  }
}