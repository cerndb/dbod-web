import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { InstanceService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
    <cern-toolbar></cern-toolbar>
    <ba-page-top></ba-page-top>
    <ba-sidebar></ba-sidebar>
    <div class="al-main">
      <div class="al-content" style="margin-top:80px">
        <router-outlet></router-outlet>
        <div *ngIf="instances">{{instances[0].basedir}}</div>
      </div>
    </div>
    <footer class="al-footer clearfix">
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  instances;

  constructor(private _menuService: BaMenuService, private _instanceService: InstanceService) {
    _instanceService.getInstances().subscribe((res) => {
      this.instances = res;
    });
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }

  
}
