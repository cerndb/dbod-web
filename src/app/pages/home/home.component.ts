import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../../theme/services/instance-service';
import { StateButtonComponent } from '../../theme/components/state-button';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home {

  instances;
  source: LocalDataSource;

  settings = {
    selectMode: 'multi',
    columns: {
      db_name: {
        title: 'DB Name',
        filter: false
      },
      hosts: {
        title: 'Host',
        filter: false
      },
      username: {
        title: 'Username',
        filter: false
      },
      class: {
        title: 'Category',
        filter: false
      },
      db_type: {
        title: 'DB Type',
        filter: false
      },
      state: {
        title: 'State',
        type: 'custom',
        renderComponent: StateButtonComponent,
        filter: false
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true,

  };

  constructor(private _instanceService: InstanceService) {
    _instanceService.getInstances().subscribe((res) => {
      this.source = new LocalDataSource(res);
    });
  }

   onSearch(query: string = '') {

    this.source.setFilter([
      // fields we want to inclue in the search
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
