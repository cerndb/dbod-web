import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { SocketLogsStatistics } from '../../sockets.module';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'instance-logs-statistics',
  templateUrl: './instance-logs-statistics.component.html',
  styleUrls: ['./instance-logs-statistics.component.scss'],
  providers: [SocketLogsStatistics, {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class InstanceLogsStatisticsComponent implements OnInit {

  @Input() data: any;
  @ViewChild("baseChart") chart: BaseChartDirective;

  source: {histogram: any, oldestTimestamp: Date, newestTimestamp: Date};
  tmin: Date;
  tmax: Date;
  tmin_day: Date;
  tmax_day: Date;
  tmin_seconds: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  tmax_seconds: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  n: number;
  logn: number;
  dbName: string;
  logType: string;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          min: new Date(0),
          max: new Date(),
          displayFormats: {
            hour: 'MMM D hA'
          }
        }
      }]
    }
  };

  public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(93,207,227,0.2)',
      borderColor: 'rgba(93,207,227,1)',
      borderWidth: 1,
    }
  ];

  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [{data: []}];
   
  constructor(@Inject(SocketLogsStatistics) private socket) {
  
  }

  ngOnInit() {
    this.socket.connect();

    this.tmin = new Date(0);
    this.tmax = new Date();
    this.tmin_day = new Date(0);
    this.tmax_day = new Date();
    this.logn = 1;
    this.n = 10;

    this.socket.on('logs_statistics', (data) => {
      this.source = JSON.parse(data);
      var labelsTemp:string[] = [];
      var dataTemp:any[] = [{data: []}];
      for(var i=0; i<this.source.histogram.length; i++) {
        this.source.histogram[i].tminSlice = new Date(this.source.histogram[i].tminSlice);
        this.source.histogram[i].tmaxSlice = new Date(this.source.histogram[i].tmaxSlice);
        labelsTemp.push(this.source.histogram[i].tminSlice);
        dataTemp[0].data.push(this.source.histogram[i].numberOfLogs);
      }
      this.source.oldestTimestamp = new Date(this.source.oldestTimestamp);
      this.source.newestTimestamp = new Date(this.source.newestTimestamp);
      // console.log(this.source);
      // console.log('receive');      

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
      this.socket.emit('getter', {name: this.dbName, logType: this.logType, tmin: this.tmin, tmax: this.tmax, n: this.n});
    }
  }

  changeTimeBase() {
    this.n = Math.round(Math.pow(10,this.logn));
    if(this.tmin_seconds != null && this.tmax_seconds != null && typeof this.tmin != 'string' && typeof this.tmax != 'string') {
      this.tmin = new Date(this.tmin_day.getFullYear(),this.tmin_day.getMonth(),this.tmin_day.getDay()+1,this.tmin_seconds.hour,this.tmin_seconds.minute,this.tmin_seconds.second); // NO IDEA WHY getDay()+1 IS NEEDED
      this.tmax = new Date(this.tmax_day.getFullYear(),this.tmax_day.getMonth(),this.tmax_day.getDay()+1,this.tmax_seconds.hour,this.tmax_seconds.minute,this.tmax_seconds.second);
      this.socket.emit('getter', {name: this.dbName, logType: this.logType, tmin: this.tmin, tmax: this.tmax, n: this.n});
    }
  }

  autoResize() {
    this.tmin = this.source.oldestTimestamp;
    this.tmin_day = this.tmin;
    this.tmin_seconds = {hour: this.tmin.getHours(), minute: this.tmin.getMinutes(), second: this.tmin.getSeconds()}
    this.tmax = this.source.newestTimestamp;
    this.tmax_day = this.tmax;
    this.tmax_seconds = {hour: this.tmax.getHours(), minute: this.tmax.getMinutes(), second: this.tmax.getSeconds()}
    this.socket.emit('getter', {name: this.dbName, logType: this.logType, tmin: this.tmin, tmax: this.tmax, n: this.n});
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
