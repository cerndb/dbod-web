import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-instances',
  templateUrl: './admin-instances.html',
  styleUrls: ['./admin-instances.scss']
})
export class AdminInstancesComponent {

  pendingInstancesTitle: string = 'Pending Instances';
  expiredInstancesTitle: string = 'Expired Instances';

  constructor() { }

}
