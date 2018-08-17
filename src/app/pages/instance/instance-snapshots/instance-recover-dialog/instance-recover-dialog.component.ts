import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../../services/rundeck/rundeck.service';

@Component({
  selector: 'instance-recover-dialog',
  templateUrl: './instance-recover-dialog.component.html',
})
export class InstanceRecoverDialogComponent {
	State = {
		Choose: 0,
		Confirm_recover: 1,
		Loading: 2,
		Success: 3,
		Error: 4,	
	}

	newTitle: string;
	state = this.State['Choose'];
	resMessage: string;
	resStatus: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) { }

	sendRename() {
		var req = {
			id: 0, // TO EDIT
			name: this.newTitle,
		};

		this.state = this.State['Loading'];
		this.rundeckService.post('job/rename-snapshots/'+this.data.instanceName,req).then( (res:any) => { // TO EDIT
	      this.resMessage = res.message;
	      this.resStatus = res.status;
	      this.state = this.State['Success'];
	    }, (err:any) => {
	    	this.resMessage = err.message;
	    	this.resStatus = err.status;
	      this.state = this.State['Error'];
	    });
	}

	sendRecover() {
		var req = {
			id: 0, // TO EDIT
		};

		this.state = this.State['Loading'];
		this.rundeckService.post('job/recover/'+this.data.instanceName,req).then( (res:any) => { // TO EDIT
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