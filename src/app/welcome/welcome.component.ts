import { Component, OnInit } from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  displayedColumns = ['day', 'time', 'venue', 'instructor','course'];
  dataSource = new PostDataSource(this.dataService);

  constructor() { }

  sendMessage() { }

  ngOnInit() {
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

