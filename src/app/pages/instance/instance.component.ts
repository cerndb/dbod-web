import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../../services/instance';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

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
  fieldsErrorStates = {};

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

  constructor( private route: ActivatedRoute, private router: Router, private instanceService: InstanceService, private http: HttpClient) {}

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

  customErrorStateMatcher: ErrorStateMatcher = {
    isErrorState: (control: FormControl | null) => {
      console.log('mouais');
      return true;
    }
  };

  changeField(e) {
    var req = {};
    req[e.target.name] = e.target.value;
    console.log(req);
    // this.fieldsErrorStates[e.target.name] = true;
    // console.log(this.fieldsErrorStates);
    this.http.put('./api/v1/instance/'+this.data.id,req).subscribe( (res) => {
      console.log(res);
    });
  }
}
