import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { LocalDataSource } from 'ng2-smart-table';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'expired-instances',
  providers: [InstanceService],
  templateUrl: './expired-instances.component.html',
  styleUrls: ['./expired-instances.component.scss']
})
export class ExpiredInstancesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'owner', 'egroup', 'project', 'type', 'category', 'date', 'rescue', 'destroy'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _InstanceService: InstanceService) {
    this.dataSource = new MatTableDataSource([{'id': '', 'name': '', 'owner': '', 'egroup': '', 'project': '', 'type': '', 'category': '', 'date': ''}]);
  }

  ngOnInit() {
    this._InstanceService.getExpiredInstances().subscribe((res) => {
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
