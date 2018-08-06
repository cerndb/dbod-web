import { Component, OnInit, Input, Inject } from '@angular/core';
import { StateButtonComponent } from '../../components/state-button/state-button.component';
import { SocketJobs } from '../sockets.module';

@Component({
  selector: 'instance-jobs',
  templateUrl: './instance-jobs.component.html',
  styleUrls: ['./instance-jobs.component.scss'],
  providers: [SocketJobs],
})
export class InstanceJobsComponent implements OnInit {

  @Input() data: any;

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  id: number;
  page :number;
  opened: boolean;

  constructor(@Inject(SocketJobs) private socket) {
  
  }

  ngOnInit() {
    this.socket.connect();

    this.opened = false;
    this.page = 1;
    this.pageLength = 10;

    this.socket.on('countjobs', (data) => {
      this.numberOfItems = JSON.parse(data);
    });

    this.socket.on('jobs', (data) => {
      if(!this.opened) {
        this.source = JSON.parse(data);
        // console.log('receive');
      }
    });
  }

  pageChanged(page) {
    this.opened = false;
    if(!isNaN(page)) {
      this.socket.emit('getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  changeItemsPerPage(e) {
    this.opened = false;
    this.pageLength = e.value;
    this.socket.emit('getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
  }

  panelOpened() {
    this.opened = true;
  }

  panelClosed() {
    this.opened = false;
  }

  ngOnChanges() {
    this.page = 1;
    this.pageLength = 10;
    if(this.data.hasOwnProperty('id')) {
      this.id = this.data.id;
      this.socket.emit('getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
