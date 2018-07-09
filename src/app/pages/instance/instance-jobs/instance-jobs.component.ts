import { Component, OnInit, Input } from '@angular/core';
import { JobService } from '../../../services/job';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { StateButtonComponent } from '../../components/state-button/state-button.component';

@Component({
  selector: 'cern-instance-jobs',
  templateUrl: './instance-jobs.component.html',
  styleUrls: ['./instance-jobs.component.scss']
})
export class InstanceJobsComponent implements OnInit {

  source: LocalDataSource;
  dbName: string;

  settings = {
     columns: {
      state: {
        title: 'State',
        type: 'custom',
        renderComponent: StateButtonComponent,
        filter: false,
      },
      command_name: {
        title: 'Command',
        filter: false,
      },
      creation_date: {
        title: 'Creation',
        filter: false,
      },
      completion_date: {
        title: 'Completion',
        filter: false,
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true,
    noDataMessage: 'No jobs found.',

  };

  constructor(
    private route: ActivatedRoute,
    private _jobService: JobService) {

    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dbName = params['id'];
      console.log(this.dbName);
    });

    this._jobService.getJobs().subscribe((res) => {
      this.source = new LocalDataSource(res);
    });
  }

  onSearch(query: string = '') {

    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'command_name',
        search: query,
      },
      {
        field: 'type',
        search: query,
      },
      {
        field: 'category',
        search: query,
      },
      {
        field: 'db_name',
        search: query,
      },
      {
        field: 'creation_date',
        search: query,
      },
      {
        field: 'completion_date',
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
