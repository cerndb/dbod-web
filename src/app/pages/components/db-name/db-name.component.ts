import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'cern-db-name',
  templateUrl: './db-name.component.html',
  styleUrls: ['./db-name.component.scss']
})
export class DbNameComponent implements ViewCell, OnInit {

  renderValue = '';
  @Input() value: string | number = '';
  @Input() rowData: any;

  constructor() { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

}