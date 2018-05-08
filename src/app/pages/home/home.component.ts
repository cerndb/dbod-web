import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home {

  jobsTitle: string = 'Jobs Overview';
  instancesTitle: string = 'Instances Overview';

  constructor() { }

}