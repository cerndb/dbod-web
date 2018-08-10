import { Component, OnInit, Input } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'expired-instances',
  providers: [InstanceService],
  templateUrl: './expired-instances.component.html',
  styleUrls: ['./expired-instances.component.scss']
})
export class ExpiredInstancesComponent implements OnInit {

  source: LocalDataSource;
  @Input() title: string;

  settings = {
    selectMode: 'multi',
    columns: {
      name: {
        title: 'DB Name',
        filter: false,
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
      expiryDate: {
        title: 'Expiry Date',
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
    this._instanceService.getExpiredInstances().subscribe((res) => {
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
          field: 'expiryDate',
          search: query,
        },

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
