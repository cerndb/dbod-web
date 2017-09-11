import { Component } from '@angular/core';
import * as jQuery from 'jquery';

import { InstanceRecoverService } from './instance-recover.service';

@Component({
  selector: 'instance-recover',
  templateUrl: './instance-recover.component.html',
  styleUrls: ['./instance-recover.component.scss']
})
export class InstanceRecover {

  public calendarConfiguration:any;
  private _instanceRecover:Object;

  constructor(private _instanceRecoverService: InstanceRecoverService) {
    this.calendarConfiguration = this._instanceRecoverService.getData();
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
  }

  public oninstanceRecoverReady(instanceRecover):void {
    this._instanceRecover = instanceRecover;
  }

  private _onSelect(start, end):void {

    if (this._instanceRecover != null) {
      let title = prompt('Event Title:');
      let eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        jQuery(this._instanceRecover).fullcalendar('renderEvent', eventData, true);
      }
      jQuery(this._instanceRecover).fullcalendar('unselect');
    }
  }
}