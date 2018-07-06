import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  jobsTitle: string = 'Jobs Overview';
  instancesTitle: string = 'Instances Overview';

  constructor() { }

}
