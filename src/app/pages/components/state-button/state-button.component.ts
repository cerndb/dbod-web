import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.scss']
})
export class StateButtonComponent implements ViewCell, OnInit {

  renderValue = '';

  @Input() value: string | number = '';
  @Input() rowData: any;

  states = {
    RUNNING: false,
    AWAITING: false,
    BUSY: false,
    STOPPED: false,
    MAINTENANCE: false,
    PENDING: false,
    FINISHED_FAIL: false,
    FINISHED_OK: false,
  };

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();    
    this.states[this.renderValue] = true;
  }
}
