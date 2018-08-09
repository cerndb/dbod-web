import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';

@Component({
  selector: 'instance-dialog',
  templateUrl: './instance-dialog.html',
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

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

	sendRequest() {
		var req = {};
    req[this.data.fieldName] = this.data.newContent;

	this.state = this.State['Loading'];
	this.http.put('./api/v1/instance/'+this.data.id,req).subscribe( (res:any) => {
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