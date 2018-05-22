import { Component, OnInit, Input } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { StateButtonComponent } from '../../components/state-button/state-button.component';
import { DbNameComponent } from '../../components/db-name/db-name.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'instances',
  providers: [InstanceService],
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements OnInit {

  source: LocalDataSource;
  @Input() title: string;

  settings = {
    selectMode: 'multi',
    columns: {
      db_name: {
        title: 'DB Name',
        filter: false,
        type: 'custom',
        renderComponent: DbNameComponent,
      },
      hosts: {
        title: 'Host',
        filter: false,
      },
      username: {
        title: 'Username',
        filter: false,
      },
      class: {
        title: 'Category',
        filter: false,
      },
      db_type: {
        title: 'DB Type',
        filter: false,
      },
      state: {
        title: 'State',
        type: 'custom',
        renderComponent: StateButtonComponent,
        filter: false,
      },
    },
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    hideSubHeader: true,
    noDataMessage: 'No instance found.',

  };

  constructor(private _instanceService: InstanceService) {

  }

  ngOnInit() {
    this._instanceService.getInstances().subscribe((res) => {
      this.source = new LocalDataSource(res);
    });
  }

   onSearch(query: string = '') {

    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'db_name',
        search: query,
      },
      {
        field: 'hosts',
        search: query,
      },
      {
        field: 'username',
        search: query,
      },
      {
        field: 'class',
        search: query,
      },
      {
        field: 'db_type',
        search: query,
      },
      {
        field: 'state',
        search: query,
      },
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
