import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../services/rundeck/rundeck.service';

@Component({
  selector: 'instance-start-stop-dialog',
  templateUrl: './instance-start-stop-dialog.component.html',
})
export class InstanceStartStopDialogComponent {
	State = {
		Confirm_start: 0,
		Confirm_stop: 1,
		Loading: 2,
		Success: 3,
		Error: 4
	}

	state;
	resMessage: string;
	resStatus: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) {
		this.state = data.startStopFlag ? this.State['Confirm_start'] : this.State['Confirm_stop'];
	}

	sendRequest() {
		this.state = this.State['Loading'];
		var pathStartStop = this.data.startStopFlag ? 'start' : 'stop';
		this.rundeckService.post('job/'+pathStartStop+'/'+this.data.instanceName).then( (data: any) => {
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