import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InstanceService } from '../../services/instance';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'instance',
  styleUrls: ['./instance.scss'],
  templateUrl: './instance.html',
  encapsulation: ViewEncapsulation.None,
})
export class InstanceComponent implements OnInit {

    dbName: String;
    data: Object = {};
    instanceClassEditable: number;
    instanceDbtypeEditable: number;
    instanceStateEditable: number;

     editableSelectOpts = {
        instanceClass: {
          'REF': 0,
          'TEST': 1,
        },
        instanceClassSelect: [
          { value: 0, text: 'REF' },
          { value: 1, text: 'TEST' },
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

    constructor( private route: ActivatedRoute, private router: Router, private instanceService: InstanceService ) {}

    ngOnInit() {
        
      this.route.params.subscribe(params => {
          this.dbName = params['id'];
      });

      this.instanceService.getInstances().subscribe((res) => {
        this.data = res.find(x => x.db_name === this.dbName);
        this.instanceClassEditable = this.editableSelectOpts.instanceClass[this.data['class']];
        this.instanceDbtypeEditable = this.editableSelectOpts.instanceDbtype[this.data['db_type']];
        this.instanceStateEditable = this.editableSelectOpts.instanceState[this.data['state']];
      });      
    }
}