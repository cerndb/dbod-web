import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../../services/rundeck/rundeck.service';

@Component({
  selector: 'instance-load-file-dialog',
  templateUrl: './instance-load-file-dialog.component.html',
})
export class InstanceLoadFileDialogComponent {
	State = {
		Deposit: 0,
		Loading: 1,
		Success: 2,
		Error: 3
	}

	state = this.State['Deposit'];
	resMessage: string;

	fileToUpload: File = null;
	textContent = '';

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) { }

	handleFileInput(files: FileList) {
	    this.fileToUpload = files.item(0);
	}

	sendRequest() {
		if(this.fileToUpload!=null) {
			this.state = this.State['Loading'];
			if(!this.data.filesNamesList.includes(this.fileToUpload.name)) {
				this.resMessage = 'Unknown configuration file. File should already exist in the files list, please check name';
				this.state = this.State['Error'];
			}
			else {
				var reader = new FileReader();
				reader.onload = (event) => { 
					this.textContent = reader.result;
					this.resMessage = 'File loaded with success';
					this.state = this.State['Success'];
				};
				reader.readAsText(this.fileToUpload);
			}
		}
	}
}