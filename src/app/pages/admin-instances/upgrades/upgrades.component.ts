import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InstanceService } from '../../../services/instance';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'upgrades',
  providers: [InstanceService],
  templateUrl: './upgrades.component.html',
  styleUrls: ['./upgrades.component.scss']
})
export class UpgradesComponent implements OnInit {

  displayedColumns: string[] = ['type', 'category', 'version_from', 'version_to', 'destroy'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthenticationService, private _instanceService: InstanceService) {
    this.dataSource = new MatTableDataSource([{'type': '', 'category': '', 'version_from': '', 'version_to': ''}]);
  }

  ngOnInit() {
    this._instanceService.getUpgrades().subscribe((res) => {
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
