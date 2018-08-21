import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../../services/rundeck/rundeck.service';

@Component({
  selector: 'instance-upload-file-dialog',
  templateUrl: './instance-upload-file-dialog.component.html',
})
export class InstanceUploadFileDialogComponent {
	State = {
		Confirm: 0,
		Loading: 1,
		Success: 2,
		Error: 3
	}

	state = this.State['Confirm'];
	resMessage: string;
	resStatus: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) { }

	sendRequest() {
		this.state = this.State['Loading'];
		this.rundeckService.post('job/upload-file/'+this.data.instanceName, this.data.file).then( (res:any) => { // TO EDIT
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