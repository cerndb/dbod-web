import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { InstanceService } from '../../../../services/instance/instance.service';

@Component({
  selector: 'instance-scheduled-backup-dialog',
  templateUrl: './instance-scheduled-backup-dialog.component.html',
  styleUrls: ['./instance-scheduled-backup-dialog.component.scss'],
})
export class InstanceScheduledBackupDialogComponent {
	State = {
		Choose: 0,
		Loading: 1,
		Success: 2,
		Error: 3,	
	}

	newTitle: string;
	state = this.State['Choose'];
	resMessage: string;
	resStatus: number;

	scheduleTime;
	scheduleDayOfWeek;
	scheduleMode;
	
	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instanceService: InstanceService) { }

	ngOnInit() {
		if(this.data.scheduleBackupsSetting!=undefined) {
			var parsedScheduleBackupsSetting = this.data.scheduleBackupsSetting.split(' ');
			this.scheduleTime = {
				hour: parseInt(parsedScheduleBackupsSetting[1]),
				minute: parseInt(parsedScheduleBackupsSetting[0]),
				second: 0,
			}
			if(parsedScheduleBackupsSetting[4]=='*') {
				this.scheduleMode = 'day';
			}
			else {
				this.scheduleMode = 'week';
				this.scheduleDayOfWeek = parseInt(parsedScheduleBackupsSetting[4]);
			}
		}
		else {
			this.scheduleMode = 'disabled';
		}
	}

	sendRequest() {
		var newScheduleBackupsSetting;
		switch(this.scheduleMode) {
			case 'disabled':
				newScheduleBackupsSetting = undefined;
			break;
			case 'day' :
				newScheduleBackupsSetting = this.scheduleTime.minute.toString()+' '+this.scheduleTime.hour.toString()+' * * *';
			break;
			case 'week' :
				newScheduleBackupsSetting = this.scheduleTime.minute.toString()+' '+this.scheduleTime.hour.toString()+' * * '+this.scheduleDayOfWeek;
			break;
		}

		this.state = this.State['Loading'];
		if(this.data.scheduleBackupsSetting==undefined && newScheduleBackupsSetting!=undefined) {
			this.instanceService.post(this.data.instanceId,true,'backup',newScheduleBackupsSetting).then( (data: any) => {
				this.resStatus = data.status;
		    	this.resMessage = data.message;
				this.state = this.State['Success'];
		    }, (err) => {
		    	this.resStatus = err.status;
		    	this.resMessage = err.message;
		    	this.state = this.State['Error'];
		    });
		}
		else if(this.data.scheduleBackupsSetting!=undefined && newScheduleBackupsSetting==undefined) {
			this.instanceService.delete(this.data.instanceId,true,'backup').then( (data: any) => {
				this.resStatus = data.status;
		    	this.resMessage = data.message;
				this.state = this.State['Success'];
		    }, (err) => {
		    	this.resStatus = err.status;
		    	this.resMessage = err.message;
		    	this.state = this.State['Error'];
		    });
		}
		else {
			this.instanceService.put(this.data.instanceId,true,'backup',newScheduleBackupsSetting).then( (data: any) => {
				this.resStatus = data.status;
		    	this.resMessage = data.message;
				this.state = this.State['Success'];
		    }, (err) => {
		    	this.resStatus = err.status;
		    	this.resMessage = err.message;
		    	this.state = this.State['Error'];
		    });
		}
	}
}