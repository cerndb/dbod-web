import { Component, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { RundeckService } from '../../../services/rundeck/rundeck.service';
import { CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {MatDialog} from '@angular/material';
import { InstanceRecoverDialogComponent } from './instance-recover-dialog/instance-recover-dialog.component';
import { InstanceBackupDialogComponent } from './instance-backup-dialog/instance-backup-dialog.component';

@Component({
  selector: 'instance-snapshots',
  templateUrl: './instance-snapshots.component.html',
  styleUrls: ['./instance-snapshots.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstanceSnapshotsComponent {

  @Input() data: any;

  view: string = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;

  events = [];

  constructor(private rundeckService: RundeckService, public dialog: MatDialog) { }

  ngOnInit() {
    this.rundeckService.post('job/get-snapshots/'+this.data.name).then( (data: any) => {
      var calendarData = [];
      data.log.split(':').forEach( (element) => {
        var day = element.split('_')[1].substring(0,2);
        var month = element.split('_')[1].substring(2,4);
        var year = element.split('_')[1].substring(4,8);
        var hours = element.split('_')[2].substring(0,2);
        var minutes = element.split('_')[2].substring(2,4);
        var seconds = element.split('_')[2].substring(4,6);
        var milliseconds = element.split('_')[3];
        var date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

        calendarData.push({
          title: date.toString(),
          start: date,
        });
      });
      this.events = calendarData;
    }, err => console.log(err));
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleSnapshot(value) {
    const dialogRef = this.dialog.open(InstanceRecoverDialogComponent, {
      data: {
        instanceName: this.data.name,
        title: value.title,
        date: value.start,
      }
    });
  }

  backup() {
    const dialogRef = this.dialog.open(InstanceBackupDialogComponent, {
      data: {
        instanceName: this.data.name,
      }
    });
  }

  scheduledBackup() {
    const dialogRef = this.dialog.open(InstanceBackupDialogComponent, {
      data: {
        instanceName: this.data.name,
      }
    });
  }
}
