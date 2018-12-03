import { Component, OnInit, Input } from '@angular/core';
import { RundeckService } from '../../../services/rundeck/rundeck.service';
import {MatDialog} from '@angular/material';
import { InstanceLoadFileDialogComponent } from './instance-load-file-dialog/instance-load-file-dialog.component';
import { InstanceUploadFileDialogComponent } from './instance-upload-file-dialog/instance-upload-file-dialog.component';
import { FileDownloaderService } from '../../../services/file-downloader/file-downloader.service';
import * as FileSaver from 'file-saver';

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
  oldFile = null;
  validate: boolean = true;
  final;
  wrongLines = null;
  constructor(private rundeckService: RundeckService, private fileDownloaderService: FileDownloaderService, public dialog: MatDialog) { }

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
		content: null,
	};

	this.rundeckService.post('job/serve-file/'+this.data.name, {"options":{
      "filepath": this.selectedConfigFile.filepath,
    }}).then( async (data: any) => {
      var url = data.log + this.selectedConfigFile.filepath;
      this.oldFile = await this.fileDownloaderService.saveFile(url, this.data.name);
      this.selectedConfigFile.content = await this.fileDownloaderService.getConfigFile(this.oldFile);
      this.displayedContent = this.selectedConfigFile.content;
    }, err => console.log(err));
  }

  downloadConfigFile() {
    if(this.selectedConfigFile.content!=null){
      var blob = new Blob([this.selectedConfigFile.content]);
      FileSaver.saveAs(blob, this.selectedConfigFile.title);
    }
  }

  uploadConfigFile() {
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

  async validateFile(){
    if(this.displayedContent!=null){
      var newContent = this.displayedContent;
      var validation = await this.fileDownloaderService.getValidation(newContent);
      this.final = validation;
      var str = JSON.stringify(validation);
      this.wrongLines = str;
      console.log(this.wrongLines);
      //this.displayedContent = validation;
      //console.log(this.displayedContent);
      if(validation == true){
        this.validate = true;
      } else this.validate = false;
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
