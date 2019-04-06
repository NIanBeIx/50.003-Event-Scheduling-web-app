import { Component, OnInit } from '@angular/core';

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

  
}