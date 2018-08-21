import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'pending-instances',
  providers: [InstanceService],
  templateUrl: './pending-instances.component.html',
  styleUrls: ['./pending-instances.component.scss']
})
export class PendingInstancesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'owner', 'egroup', 'project', 'type', 'category', 'validate'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _instanceService: InstanceService) {
    this.dataSource = new MatTableDataSource([{'id': '', 'name': '', 'owner': '', 'egroup': '', 'project': '', 'type': '', 'category': ''}]);
  }

  ngOnInit() {
    this._instanceService.getPendingInstances().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
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
