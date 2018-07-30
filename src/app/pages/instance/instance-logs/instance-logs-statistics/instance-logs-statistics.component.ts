import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'instance-logs-statistics',
  templateUrl: './instance-logs-statistics.component.html',
  styleUrls: ['./instance-logs-statistics.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class InstanceLogsStatisticsComponent implements OnInit {

  @Input() data: any;
  @ViewChild("baseChart") chart: BaseChartDirective;

  source: {histogram: any, oldestTimestamp: Date, newestTimestamp: Date};
  tmin: Date;
  tmax: Date;
  n: number;
  logn: number;
  dbName: string;
  logType: string;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        time: {
          min: new Date(0),
          max: new Date(),
        }
      }]
    }
  };

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [{data: []}];
   
  constructor(private socket: Socket) {
  
  }

  ngOnInit() {
    this.tmin = new Date(0);
    this.tmax = new Date();
    this.logn = 1;
    this.n = 10;

    this.socket.on('logs_statistics', (data) => {
      this.source = JSON.parse(data);
      for(var i=0; i<this.source.histogram.length; i++) {
        this.source.histogram[i].tminSlice = new Date(this.source.histogram[i].tminSlice);
        this.source.histogram[i].tmaxSlice = new Date(this.source.histogram[i].tmaxSlice);
      }
      this.source.oldestTimestamp = new Date(this.source.oldestTimestamp);
      this.source.newestTimestamp = new Date(this.source.newestTimestamp);
      // console.log(this.source);
      // console.log('receive');

      var labelsTemp:string[] = [];
      var dataTemp:any[] = [{data:[]}];
      for(var i=0; i<this.source.histogram.length; i++) {
        labelsTemp.push(this.source.histogram[i].tminSlice);
        dataTemp[0].data.push(this.source.histogram[i].numberOfLogs);
      }

      var optionsTemp  = this.barChartOptions;
      optionsTemp.scales.xAxes[0].time.min = this.tmin;
      optionsTemp.scales.xAxes[0].time.max = this.tmax;
      
      this.chart.ngOnDestroy();
      this.chart.labels = labelsTemp;
      this.barChartData = dataTemp;
      this.barChartOptions = optionsTemp;
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx); // QUICKFIX : https://github.com/valor-software/ng2-charts/issues/806
    });
  }

  ngOnChanges() {
    // this.tmin = new Date(0);
    // this.tmax = new Date();
    // this.n = 10;
    if(this.data.hasOwnProperty('type')) {
      this.dbName = this.data.name;
      switch(this.data.type) {
        case 'MYSQL': this.logType = 'mylog'; break;
        case 'InfluxDB': this.logType = 'inflog'; break;
        case 'PG': this.logType = 'pglog'; break;
      }
      this.socket.emit('logs_statistics_getter', {name: this.dbName, logType: this.logType, tmin: this.tmin, tmax: this.tmax, n: this.n});
    }
  }

  changeTimeBase() {
    this.n = Math.round(Math.pow(10,this.logn));
    if(typeof this.tmin != 'string' && typeof this.tmax != 'string') {
      this.socket.emit('logs_statistics_getter', {name: this.dbName, logType: this.logType, tmin: this.tmin, tmax: this.tmax, n: this.n});
    }
  }

  autoResize() {
    this.tmin = this.source.oldestTimestamp;
    this.tmax = this.source.newestTimestamp;
    this.socket.emit('logs_statistics_getter', {name: this.dbName, logType: this.logType, tmin: this.tmin, tmax: this.tmax, n: this.n});
  }

  ngOnDestroy() {
    this.socket.emit('close_logs_statistics_getter');
  }
}
