import { Component } from '@angular/core';

@Component({
  selector: 'kebab-case',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html',
})
export class HomeComponent {

  jobsTitle: string = 'Jobs Overview';
  instancesTitle: string = 'Instances Overview';

  constructor() { }

}
