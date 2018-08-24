import { Component, OnInit, Input, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import { InstanceDialogComponent } from './instance-dialog/instance-dialog.component';
import {MatCheckbox} from '@angular/material';
import {MatSlideToggle} from '@angular/material';
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
  data: any;
  instanceClassEditable: number;
  instanceDbtypeEditable: number;
  instanceStateEditable: number;

   editableSelectOpts = {
      instanceClass: {
        'REF': 0,
        'TEST': 1,
        'PROD': 2,
      },
      instanceClassSelect: [
        { value: 0, text: 'REF' },
        { value: 1, text: 'TEST' },
        { value: 2, text: 'PROD' },
      ],
      instanceDbtype: {
        'MYSQL': 0,
        'POSTGRESQL': 1,
        'INFLUXDB': 2,
        'ORACLE11G': 3,
        'ORACLE12C': 4,
      },
      instanceDbtypeSelect: [
        { value: 0, text: 'MYSQL' },
        { value: 1, text: 'POSTGRESQL' },
        { value: 2, text: 'INFLUXDB' },
        { value: 3, text: 'ORACLE11G' },
        { value: 4, text: 'ORACLE12C' },
      ],
      instanceState: {
        'RUNNING': 0,
        'STOPPED': 1,
        'MAINTENANCE': 2,
        'BUSY': 3,
        'AWAITING': 4,
      },
      instanceStateSelect: [
        { value: 0, text: 'RUNNING' },
        { value: 1, text: 'STOPPED' },
        { value: 2, text: 'MAINTENANCE' },
        { value: 3, text: 'BUSY' },
        { value: 4, text: 'AWAITING' },
      ],
  };

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router, @Inject(SocketInstance) private socket, public dialog: MatDialog) {}

  ngOnInit() {
    this.socket.connect();

    this.data = {};

    this.socket.on('instance', (data) => {
      this.data = JSON.parse(data);
      // console.log('receive');
      // console.log(this.data);
      this.instanceClassEditable = this.editableSelectOpts.instanceClass[this.data['category']];
      this.instanceDbtypeEditable = this.editableSelectOpts.instanceDbtype[this.data['type']];
      this.instanceStateEditable = this.editableSelectOpts.instanceState[this.data['state']];
    });

    
    this.route.params.subscribe(params => {
        this.dbName = params['id'];
        this.authService.loadUser().then( () => {
          this.socket.emit('getter', {jwt: this.authService.user.jwt, name: this.dbName});
        });
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
  }

  changeAttributeField(name,value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        attribute: true,
        precContent: this.data[name],
        newContent: value,
      }
    });
  }

  startStopInstance(value) {
    const dialogRef = this.dialog.open(InstanceStartStopDialogComponent, {
      data: {
        instanceName: this.data.name,
        startStopFlag: value,
      }
    });
  }
}