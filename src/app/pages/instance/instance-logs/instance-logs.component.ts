import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'instance-logs',
  templateUrl: './instance-logs.component.html',
  styleUrls: ['./instance-logs.component.scss'],
})

export class InstanceLogsComponent implements OnInit {

  @Input() data: any;

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  dbName: string;
  logType: string;
  page :number;
  opened: boolean;

  public statisticsCollapsed = true;

  constructor(private socket: Socket) {
  
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
    this.opened = false;
    this.page = 1;
    this.pageLength = 10;

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

  ngOnChanges() {
    this.page = 1;
    this.pageLength = 10;
    if(this.data.hasOwnProperty('type')) {
      this.dbName = this.data.name;
      switch(this.data.type) {
        case 'MYSQL': this.logType = 'mylog'; break;
        case 'InfluxDB': this.logType = 'inflog'; break;
        case 'PG': this.logType = 'pglog'; break;
      }
      this.socket.emit('logs_getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength});
    }
  }

  ngOnDestroy() {
    this.socket.emit('close_logs_getter');
  }
}