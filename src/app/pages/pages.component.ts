import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'cern-ngx-pages',
  template: `
  <cern-ngx-one-column-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet></router-outlet>
  </cern-ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = [
    {
      title: 'Dashboard',
      icon: 'nb-home',
      link: '/pages/dashboard',
      home: true,
    },
    {
      title: 'Overview',
      icon: 'nb-grid-a',
      link: '/pages/overview',
      home: false,
    },
    {
      title: 'Admin',
      icon: 'nb-person',
      link: '/pages/admin-instances',
      home: false,
      hidden: true,
    },
  ];

  constructor(private authService: AuthenticationService) { }

  ngDoCheck() {
    if(this.authService.user!=undefined) {
      this.menu[2].hidden = !this.authService.user.isAdmin;
    }
  }
}
