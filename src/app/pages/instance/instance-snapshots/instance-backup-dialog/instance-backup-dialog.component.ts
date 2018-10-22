import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../../services/rundeck/rundeck.service';

@Component({
  selector: 'instance-backup-dialog',
  templateUrl: './instance-backup-dialog.component.html',
})
export class InstanceBackupDialogComponent {
	State = {
		Confirm: 0,
		Loading: 1,
		Success: 2,
		Error: 3,
	}

	newTitle: string;
	state = this.State['Confirm'];
	resMessage: string;
	resStatus: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) { }

	sendRequest() {
		this.state = this.State['Loading'];
		this.rundeckService.post('job/backup/'+this.data.instanceName+'?async').then( (res:any) => {
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
