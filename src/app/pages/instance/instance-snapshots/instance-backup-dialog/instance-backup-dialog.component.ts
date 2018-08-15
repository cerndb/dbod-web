import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../../services/rundeck/rundeck.service';

@Component({
  selector: 'instance-backup-dialog',
  templateUrl: './instance-backup-dialog.html',
})
export class InstanceBackupDialogComponent {
	State = {
		Choose: 0,
		Confirm_backup: 1,
		Loading: 2,
		Success: 3,
		Error: 4,	
	}

	newTitle: string;
	state = this.State['Choose'];
	resMessage: string;
	resStatus: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) { }

	sendBackup() {
		var req = {
			id: 0, // TO EDIT
		};

		this.state = this.State['Loading'];
		this.rundeckService.post('job/backup/'+this.data.instanceName,req).then( (res:any) => { // TO EDIT
	      this.resMessage = res.message;
	      this.resStatus = res.status;
	      this.state = this.State['Success'];
	    }, (err:any) => {
	    	this.resMessage = err.message;
	    	this.resStatus = err.status;
	      this.state = this.State['Error'];
	    });
	}

	sendScheduledBackup() {
		var req = {
			id: 0, // TO EDIT
		};

		this.state = this.State['Loading'];
		this.rundeckService.post('job/scheduled-backup/'+this.data.instanceName,req).then( (res:any) => { // TO EDIT
	      this.resMessage = res.message;
	      this.resStatus = res.status;
	      this.state = this.State['Success'];
	    }, (err:any) => {
	    	this.resMessage = err.message;
	    	this.resStatus = err.status;
	      this.state = this.State['Error'];
	    });
	}
}