import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef, Inject } from '@angular/core';
import { SocketLogs } from '../sockets.module';
import { RundeckService } from '../../../services/rundeck/rundeck.service';
import { FileDownloaderService } from '../../../services/file-downloader/file-downloader.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import * as FileSaver from 'file-saver';

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

  logFilesList = [];

  constructor(private authService: AuthenticationService, @Inject(SocketLogs) private socket, private rundeckService: RundeckService, private fileDownloaderService: FileDownloaderService) {

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
        // console.log('receive');
      }
    });
  }

  pageChanged(page) {
    this.opened = false;
    if(!isNaN(page)) {
      this.authService.loadUser().then( () => {
        this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
      });
    }
  }

  changeItemsPerPage(e) {
    this.opened = false;
    this.pageLength = e.value;
    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    });
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
      this.authService.loadUser().then( () => {
        this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
      });
    }
  }

  realTimeHandler(e) {
    if(e.checked) {
      this.socket.emit('realtime_on');
      this.opened = false;
      this.authService.loadUser().then( () => {
        this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
      });
    }
    else {
      this.socket.emit('realtime_off');
    }
  }

  changeFilters(value) {
    this.page = 1;
    if(value.length!=0) {
      this.filters = value;
    }
    else {
      this.filters = '*';
    }
    this.opened = false;
    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName, logType: this.logType, size: this.pageLength, from: (this.page-1)*this.pageLength, filters:this.filters});
    });
  }

  listLogFiles() {
    if(this.logFilesList.length==0) {
      this.rundeckService.post('job/list-log-files/'+this.data.name).then( (data: any) => {
        data.log.substr(2).slice(0,-2).split("', '").forEach( (element) => {
          this.logFilesList.push({
            title: element.split("/").slice(-1)[0],
            filepath: element,
          });
        });
      }, err => console.log(err));
    }
  }

  downloadLogFile(logFileData) {
    this.rundeckService.post('job/serve-file/'+this.data.name, {"options":{
      "filepath": logFileData.filepath,
    }}).then( async (data: any) => {
      var host = data.log + logFileData.filepath;
      var file = await this.fileDownloaderService.getLogFile(host);
      var blob = new Blob([file]);
      FileSaver.saveAs(blob, logFileData.title);
    }, err => console.log(err));
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
