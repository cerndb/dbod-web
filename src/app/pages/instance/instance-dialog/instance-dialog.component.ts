import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { InstanceService } from '../../../services/instance/instance.service';

@Component({
  selector: 'instance-dialog',
  templateUrl: './instance-dialog.component.html',
})
export class InstanceDialogComponent {
	State = {
		Confirm: 0,
		Loading: 1,
		Success: 2,
		Error: 3
	}

	state = this.State['Confirm'];
	resMessage: string;
	resStatus: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instanceService: InstanceService) { }

	sendRequest() {
		this.state = this.State['Loading'];
		this.instanceService.put(this.data.id,this.data.attribute,this.data.fieldName,this.data.newContent).then( (data: any) => {
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