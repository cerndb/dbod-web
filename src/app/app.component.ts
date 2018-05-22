/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {MENU_ITEMS} from "./app-menu";

@Component({
  selector: 'ngx-app',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class AppComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
