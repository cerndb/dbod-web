import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'db-name',
  templateUrl: './db-name.component.html',
  styleUrls: ['./db-name.component.scss']
})
export class DbNameComponent implements ViewCell, OnInit {

  renderValue = '';
  @Input() value: string | number;

  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();    
  }

  onClick() {
      document.getElementById('instance-list-view').style.display = 'none';
  }
}