import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../../theme/services/instance-service';
import { JobService } from '../../theme/services/job-service';
import { StateButtonComponent } from '../../theme/components/state-button';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home {

  source: LocalDataSource;
  sourceJobs: LocalDataSource;

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
    noDataMessage: 'No instance found.'

  };

  settingsJobs = {
    selectMode: 'multi',
    columns: {
      instance_id: {
        title: 'Instance id',
        filter: false
      },
      execution_id: {
        title: 'Execution id',
        filter: false
      },
      command_name: {
        title: 'Command',
        filter: false
      },
      creation_date: {
        title: 'Category',
        filter: false
      },
      completion_date: {
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
    noDataMessage: 'No instance found.'

  };

  constructor(private _instanceService: InstanceService, private _jobService: JobService) {
    _instanceService.getInstances().subscribe((res) => {
      this.source = new LocalDataSource(res);
    });

    _jobService.getJobs().subscribe((res) => {
      this.sourceJobs = new LocalDataSource(res);
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
