import { Component, OnInit, Input, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import { InstanceDialogComponent } from './instance-dialog/instance-dialog.component';
import {MatCheckbox} from '@angular/material';
import {MatSlideToggle} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { InstanceStartStopDialogComponent } from './instance-start-stop-dialog/instance-start-stop-dialog.component';
import { SocketInstance } from './sockets.module';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'instance',
  styleUrls: ['./instance.scss'],
  templateUrl: './instance.html',
  encapsulation: ViewEncapsulation.None,
  providers: [SocketInstance],
})

export class InstanceComponent implements OnInit {
  dbName: String;
  data:any = {};
  editedData:any = {};

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, @Inject(SocketInstance) private socket, public dialog: MatDialog) {}

  loadData() {
    this.authService.loadUser().then( () => {
      this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName});
    });
  }

  ngOnInit() {
    this.socket.connect();

    this.socket.on('instance', (data) => {
      this.data = JSON.parse(data);
      this.editedData = JSON.parse(data); // this.editedData = this.data doesn't give the same behaviour :o
      // console.log('receive');
      // console.log(this.data);
    });

    
    this.route.params.subscribe(params => {
        this.dbName = params['id'];
        this.loadData();
    });
  }

  changeField(name,value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: false,
        precContent: this.data[name],
        newContent: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  changeAttributeField(name,value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: true,
        precContent: this.data.attributes[name],
        newContent: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }

  startStopInstance(value) {
    const dialogRef = this.dialog.open(InstanceStartStopDialogComponent, {
      data: {
        instanceName: this.data.name,
        startStopFlag: value,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    })
  }
}