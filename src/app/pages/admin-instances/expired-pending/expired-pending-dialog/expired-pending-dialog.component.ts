import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MatSpinner } from '@angular/material';
import { MatBadge } from '@angular/material';
import { RundeckService } from '../../../../services/rundeck/rundeck.service';

@Component({
  selector: 'expired-pending-dialog',
  templateUrl: './expired-pending-dialog.component.html',
})
export class ExpiredPendingDialogComponent {
  Action = {
    Validate: 0,
    Rescue: 1,
    Destroy: 2,
    Loading: 3,
    Success: 4,
    Error: 5
  }

  action;
	resMessage: string;
	resStatus: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rundeckService: RundeckService) {
    if(data.buttonAction == this.Action['Validate']){
      this.action = this.Action['Validate'];
      console.log(this.action);
    } else {
      if(data.buttonAction == this.Action['Rescue']){
        this.action = this.Action['Rescue'];
        console.log(this.action);
      }
     else {
      if(data.buttonAction == this.Action['Destroy']){
        this.action = this.Action['Destroy'];
        console.log(this.action);
      }
    }
  }
}
}
