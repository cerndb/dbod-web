import { Component, OnInit, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LogService } from '../../../services/log';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { StateButtonComponent } from '../../components/state-button/state-button.component';

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
  dbType: string;
  logType: string;
  page :number;

  constructor(private route: ActivatedRoute, private _logService: LogService) {
  
  }

  pageChanged(page) {
    if(!isNaN(page)) {
      this._logService.getLogs(this.dbName,this.logType,this.pageLength,(page-1)*this.pageLength).subscribe((res) => {
        this.source = res;
      });
    }
  }

  changeItemsPerPage(number) {
    this.pageLength = number
    this._logService.getLogs(this.dbName,this.logType,this.pageLength,(this.page-1)*this.pageLength).subscribe((res) => {
      this.source = res;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dbName = 'ipmiexc'; //TO REMOVE
      // this.dbName = params['id'];
      this.dbType = params['id']; //really ?
      this.logType = 'mylog';
    });

    this.page = 1;
    this.pageLength = 30;

    this._logService.countLogs(this.dbName,this.logType).subscribe((res) => {
      this.numberOfItems = res.count;
    });

    this._logService.getLogs(this.dbName,this.logType,this.pageLength,0).subscribe((res) => {
      this.source = res;
    });
  }  
}