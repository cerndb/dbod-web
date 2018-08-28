import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'admin-instances',
  templateUrl: './admin-instances.html',
  styleUrls: ['./admin-instances.scss']
})
export class AdminInstancesComponent {

  expiredPendingTitle: string = 'Pending and Expired Instances';
  upgradesTitle: string = 'Upgrades';

  constructor(private authService: AuthenticationService) { }

}
