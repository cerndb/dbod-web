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
        {
          title: 'Snapshot #1',
          start: '2017-09-01T09:00:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #2',
          start: '2017-09-01T12:00:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #3',
          start: '2017-09-01T17:00:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #1',
          start: '2017-09-04T10:30:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #1',
          start: '2017-09-05T10:30:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #1',
          start: '2017-09-06T10:30:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #2',
          start: '2017-09-06T18:30:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #1',
          start: '2017-09-07T10:30:00',
          color: '#005562',
        },
        {
          title: 'Snapshot #1',
          start: '2017-09-14T20:00:00',
          color: '#005562',
        },
      ],
    };
  }
}
