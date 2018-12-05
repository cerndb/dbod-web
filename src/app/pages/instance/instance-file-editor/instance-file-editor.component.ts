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
  list = null;
  items = [];

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
      var validated_contents = await this.fileDownloaderService.getValidation(newContent);
      newContent = JSON.stringify(newContent);
      var newe = JSON.parse(newContent);
      console.log("NEW: " + newe);
      console.log(validated_contents);
      this.list = validated_contents;
      console.log("content: " + newContent);

/*
      for(var i = 0; i < this.list.length; i++){
        console.log(this.list[i].name);
        console.log(this.list[i].value);
      }
*/
      /*for(var i = 0; i < this.list.length; i++){
        if(this.list[i][1] == false){
          console.log(this.list[i][0]);
        }
      }*/
      /*this.list = Object.keys(validated_contents).map(function(key) {
        return [String(key), validated_contents[key]];
      });
      console.log("RES: " + this.list);
      }*/
    }
  }

  saveItems(item){
    this.items.push(item);
    console.log("adding: " + item);
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
