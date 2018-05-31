import { Injectable } from '@angular/core';

@Injectable()
export class InstanceRecoverService {

  constructor() {
  }

  getData() {

    return [
      {
        title: 'Snapshot #1',
        start: '2018-06-01T09:00:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #2',
        start: '2018-06-01T12:00:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #3',
        start: '2018-06-01T17:00:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #1',
        start: '2018-06-04T10:30:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #1',
        start: '2018-06-05T10:30:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #1',
        start: '2018-06-06T10:30:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #2',
        start: '2018-06-06T18:30:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #1',
        start: '2018-06-07T10:30:00',
        color: '#3dcc6d',
      },
      {
        title: 'Snapshot #1',
        start: '2018-06-14T20:00:00',
        color: '#3dcc6d',
      },
    ];
  }
}
