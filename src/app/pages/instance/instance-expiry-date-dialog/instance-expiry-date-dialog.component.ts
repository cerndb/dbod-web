import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { InstanceService } from '../../../services/instance/instance.service';

@Component({
  selector: 'instance-expiry-date-dialog',
  templateUrl: './instance-expiry-date-dialog.component.html'
})
export class InstanceExpiryDateDialogComponent {
  ExpiryDate = {
    LessDate: 0,
    HigherDate: 1,
    InvalidChange: 2
  }

  expiry;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instanceService: InstanceService) {
    this.expiry = data.expiryDate;
  }


}
