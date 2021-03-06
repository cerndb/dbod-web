import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'expired-pending',
  providers: [InstanceService],
  templateUrl: './expired-pending.component.html',
  styleUrls: ['./expired-pending.component.scss']
})
export class ExpiredPendingComponent implements OnInit {

  displayedColumns: string[] = ['name', 'owner', 'egroup', 'project', 'type', 'category', 'expiry_date', 'validate', 'rescue', 'destroy'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthenticationService, private _InstanceService: InstanceService) {
    this.dataSource = new MatTableDataSource([{'name': '', 'owner': '', 'egroup': '', 'project': '', 'type': '', 'category': '', 'expiry_date': ''}]);
  }

  ngOnInit() {
    this._InstanceService.getExpiredPending().then((res) => {
      var currentDate = new Date();
      var expiredPending = [];
      for(var i = 0; i < res['response'].length; i++){
        var expiryDate = new Date(res['response'][i].expiry_date);
        if((res['response'][i].state == "AWAITING_APPROVAL") || (res['response'][i].expiry_date != null && expiryDate < currentDate)){
          expiredPending.push(res['response'][i]);
        }
      }
      this.dataSource = new MatTableDataSource(expiredPending);
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
