import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {InstanceRecoverService} from '../../../services/instance/instance-recover.service';
import { CalendarComponent } from 'ng-fullcalendar';

@Component({
  selector: 'instance-recover',
  templateUrl: './instance-recover.component.html',
  styleUrls: ['./instance-recover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstanceRecoverComponent {
  calendarOptions: Object = {
    editable: false,
    defaultDate: '2018-06-11',
    eventLimit: true,
    timeFormat: 'HH:mm',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,listMonth'
    },
  };

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private _instanceRecoverService: InstanceRecoverService) {
    this.calendarOptions['events'] = this._instanceRecoverService.getData();
  }
}
