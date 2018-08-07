import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../../services/instance';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import { InstanceDialogComponent } from './instance-dialog/instance-dialog.component';
import {MatCheckbox} from '@angular/material';
import {MatSlideToggle} from '@angular/material';

@Component({
  selector: 'instance',
  styleUrls: ['./instance.scss'],
  templateUrl: './instance.html',
  encapsulation: ViewEncapsulation.None,
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

  isAdmin = false;

  constructor( private route: ActivatedRoute, private router: Router, private instanceService: InstanceService, public dialog: MatDialog) {}

  ngOnInit() {
    this.data = {};
    this.route.params.subscribe(params => {
        this.dbName = params['id'];
    });

    this.instanceService.getInstances().subscribe((res) => {
      this.data = res['response'].find(x => x.name === this.dbName);
      this.instanceClassEditable = this.editableSelectOpts.instanceClass[this.data['category']];
      this.instanceDbtypeEditable = this.editableSelectOpts.instanceDbtype[this.data['type']];
      this.instanceStateEditable = this.editableSelectOpts.instanceState[this.data['state']];
    });
  }

  changeField(name,value) {
    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        id: this.data.id,
        fieldName: name,
        precContent: this.data[name],
        newContent: value,
      }
    });
  }
}