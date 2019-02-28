import {Component} from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent {
  constructor(private dataService: DataService) {
  }

  displayedColumns = ['date_posted', 'title', 'course'];
  dataSource = new PostDataSource(this.dataService);
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}