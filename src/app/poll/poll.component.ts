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
  /**pollModel refers to the selection of the poll
   * 1 = Schedule 1
   * 2 = Schedule 2
   * 3 = Schedule 3
   */
  pollModel = 0;
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