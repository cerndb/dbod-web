import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'admin-instances',
  templateUrl: './admin-instances.html',
  styleUrls: ['./admin-instances.scss']
})
export class AdminInstancesComponent {

  pendingInstancesTitle: string = 'Pending Instances';
  expiredInstancesTitle: string = 'Expired Instances';

  constructor(private authService: AuthenticationService) { }

}
