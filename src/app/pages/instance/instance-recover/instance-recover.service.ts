import { Injectable } from '@angular/core';

@Injectable()
export class InstanceRecoverService {

  constructor() {
  }

  getData() {

    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
      },
      defaultDate: '2017-09-11',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        
      ]
    };
  }
}