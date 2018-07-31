import { Component, OnInit, Input } from '@angular/core';
import { StateButtonComponent } from '../../components/state-button/state-button.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'instance-jobs',
  templateUrl: './instance-jobs.component.html',
  styleUrls: ['./instance-jobs.component.scss']
})
export class InstanceJobsComponent implements OnInit {

  @Input() data: any;

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  id: number;
  page :number;
  opened: boolean;

  constructor(private socket: Socket) {
  
  }

  pageChanged(page) {
    if(!isNaN(page)) {
      this.socket.emit('jobs_getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  changeItemsPerPage(e) {
    this.pageLength = e.value;
    this.socket.emit('jobs_getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
  }

    panelOpened() {
    this.opened = true;
  }

  panelClosed() {
    this.opened = false;
    this.socket.emit('jobs_getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
  }

  ngOnInit() {
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

  ngOnChanges() {
    this.page = 1;
    this.pageLength = 10;
    if(this.data.hasOwnProperty('id')) {
      this.id = this.data.name; //TODO : replace name by id
      this.socket.emit('jobs_getter', {id: this.id, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  ngOnDestroy() {
    this.socket.emit('close_jobs_getter');
  }
}
