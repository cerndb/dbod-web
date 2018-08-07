import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { SocketLogs } from '../sockets.module';

@Component({
  selector: 'instance-logs',
  templateUrl: './instance-logs.component.html',
  styleUrls: ['./instance-logs.component.scss'],
  providers: [SocketLogs],
})

export class InstanceLogsComponent implements OnInit {

  @Input() data: any;

  source = new Array();
  numberOfItems: number;
  pageLength: number;
  dbName: string;
  logType: string;
  page: number;
  filters: string = '*';

  opened: boolean;
  public statisticsCollapsed = true;

  constructor(@Inject(SocketLogs) private socket) {
  
  }

  ngOnInit() {
    this.socket.connect();

    this.opened = false;
    this.page = 1;
    this.pageLength = 10;

    this.socket.on('countlogs', (data) => {
      this.numberOfItems = JSON.parse(data).count;
    });

    this.socket.on('logs', (data) => {
      if(!this.opened) {
        this.source = JSON.parse(data);
        console.log('receive');
      }
    });
  }

  pageChanged(page) {
    this.opened = false;
    if(!isNaN(page)) {
      this.socket.emit('getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    }
  }

  changeItemsPerPage(e) {
    this.opened = false;
    this.pageLength = e.value;
    this.socket.emit('getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
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
    if(this.data.hasOwnProperty('type')) {
      this.dbName = this.data.name;
      switch(this.data.type) {
        case 'MYSQL': this.logType = 'mylog'; break;
        case 'InfluxDB': this.logType = 'inflog'; break;
        case 'PG': this.logType = 'pglog'; break;
      }
      this.socket.emit('getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    }
  }

  changeFilters(value) {
    if(value.length!=0) {
      this.filters = value;
    }
    else {
      this.filters = '*';
    }
    this.socket.emit('getter', {name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}