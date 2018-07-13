import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { StateButtonComponent } from '../../components/state-button/state-button.component';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'instance-logs',
  templateUrl: './instance-logs.component.html',
  styleUrls: ['./instance-logs.component.scss'],
})

export class InstanceLogsComponent implements OnInit {

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  dbName: string;
  logType: string;
  page :number;
  opened: boolean;

  constructor(private route: ActivatedRoute, private socket: Socket) {
  
  }

  pageChanged(page) {
    if(!isNaN(page)) {
      this.socket.emit('logs_getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  changeItemsPerPage(number) {
    this.pageLength = number
    this.socket.emit('logs_getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength});
  }

  panelChange(event) {
    this.opened = event.nextState;
    if(!this.opened) {
      this.socket.emit('logs_getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dbName = 'ipmiexc'; //TO REMOVE
      // this.dbName = params['id'];
      this.logType = 'mylog';
    });

    this.opened = false;
    this.page = 1;
    this.pageLength = 10;

    this.socket.emit('logs_getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength});

    this.socket.on('countlogs', (data) => {
      this.numberOfItems = JSON.parse(data).count;
    });

    this.socket.on('logs', (data) => {
      if(!this.opened) {
        this.source = JSON.parse(data);
        // console.log('receive');
      }
    });
  }

  ngOnDestroy() {
    this.socket.emit('close_logs_getter');
  }
}