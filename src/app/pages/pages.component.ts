import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

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
    menu = MENU_ITEMS;
}
