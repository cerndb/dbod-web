import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { LocalDataSource } from 'ng2-smart-table';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'instances',
  providers: [InstanceService],
  templateUrl: './instances.component.html',
  styleUrls: ['./instances.component.scss']
})
export class InstancesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'state', 'name', 'owner', 'egroup', 'project', 'type', 'category'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _instanceService: InstanceService) {
    this.dataSource = new MatTableDataSource([{'id': '', 'state': '', 'name': '', 'owner': '', 'egroup': '', 'project': '', 'type': '', 'category': ''}]);
  }

  ngOnInit() {
    this._instanceService.getInstances().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res['response']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
