import { Component, OnInit, Input } from '@angular/core';
import { RundeckService } from '../../../services/rundeck/rundeck.service';
import {MatDialog} from '@angular/material';
import { InstanceLoadFileDialogComponent } from './instance-load-file-dialog/instance-load-file-dialog.component';
import { InstanceUploadFileDialogComponent } from './instance-upload-file-dialog/instance-upload-file-dialog.component';

@Component({
  selector: 'instance-file-editor',
  templateUrl: './instance-file-editor.component.html',
  styleUrls: ['./instance-file-editor.component.scss']
})
export class InstanceFileEditorComponent implements OnInit {

	@Input() data: any;

	configFilesList = [];
	selectedConfigFile = {
		title: null,
		filepath: null,
		content: null,
	};
	displayedContent = null;

  constructor(private rundeckService: RundeckService, public dialog: MatDialog) { }

  ngOnInit() {
  	this.rundeckService.post('job/list-config-files/'+this.data.name).then( (data: any) => {
	    data.log.substr(2).slice(0,-2).split("', '").forEach( (element) => {
	      this.configFilesList.push({
	        title: element.split("/").slice(-1)[0],
	        filepath: element,
	      });
	    });
  	}, err => console.log(err));
  }

  selectConfigFile(data) {
  	this.selectedConfigFile = {
		title: data.title,
		filepath: data.filepath,
		content: null, // TO EDIT
	};
	this.displayedContent = null;
  }

  downloadConfigFile() {
  	if(this.selectedConfigFile.filepath!=null) {
  		this.rundeckService.post('job/serve-file/'+this.data.name, {
	      filepath: this.selectedConfigFile.filepath,
	      port: 55005,
	    }).then( (data: any) => {
	      console.log(data);
	    }, err => console.log(err));
  	}
  }

  loadConfigFile() {
  	if(this.configFilesList.length!=0) {
  		var filesNamesList = [];
	  	this.configFilesList.forEach( (element) => {
	  		filesNamesList.push(element.title);
	  	});
	  	const dialogRef = this.dialog.open(InstanceLoadFileDialogComponent, {
	      data: {
	        instanceName: this.data.name,
	        filesNamesList: filesNamesList,
	      }
	    });

	    dialogRef.afterClosed().subscribe(data => {
	      if(data!='') {
	      	this.selectedConfigFile = this.configFilesList.find((element) => {
	      		return element.title==data.title;
	      	});
	      	this.displayedContent = data.textContent;
	      }
	    });
  	}
  }

  submitChanges() {
  	if(this.selectedConfigFile.title!=null && this.displayedContent!=null) {
  		var file = this.selectedConfigFile;
	  	file.content = this.displayedContent;
	  	const dialogRef = this.dialog.open(InstanceUploadFileDialogComponent, {
	      data: {
	        instanceName: this.data.name,
	        file: file,
	      }
	    });
  	}
  }
}