import { Component, OnInit, Input } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { DbNameComponent } from '../../components/db-name/db-name.component';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'pending-instances',
  providers: [InstanceService],
  templateUrl: './pending-instances.component.html',
  styleUrls: ['./pending-instances.component.scss']
})
export class PendingInstancesComponent implements OnInit {

  source: LocalDataSource;
  @Input() title: string;

  settings = {
    selectMode: 'multi',
    columns: {
      name: {
        title: 'DB Name',
        filter: false,
        type: 'custom',
        renderComponent: DbNameComponent,
      },
      host: {
        title: 'Host',
        filter: false,
      },
      owner: {
        title: 'Owner',
        filter: false,
      },
      category: {
        title: 'Category',
        filter: false,
      },
      type: {
        title: 'DB Type',
        filter: false,
      },
      version: {
        title: 'Version',
        filter: false,
      },
      /*validate: {
        title: 'Validate',
        filter: false,
        type: 'custom',
        renderComponent: ValidateButtonComponent,
      },*/
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
    this._instanceService.getPendingInstances().subscribe((res) => {
       this.source = new LocalDataSource(res);
    });
  }

  onSearch(query: string = '') {

    if(query!='') {
      this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'name',
          search: query,
        },
        {
          field: 'host',
          search: query,
        },
        {
          field: 'username',
          search: query,
        },
        {
          field: 'category',
          search: query,
        },
        {
          field: 'type',
          search: query,
        },
        {
          field: 'version',
          search: query,
        },
        /*{
          field: 'validate',
          search: query,
        },*/
      ], false);
      // second parameter specifying whether to perform 'AND' or 'OR' search
      // (meaning all columns should contain search query or at least one)
      // 'AND' by default, so changing to 'OR' by setting false here
    }
    else {
      this.source.setFilter([]);
    }
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
