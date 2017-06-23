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
      </div>
    </div>
    <footer class="al-footer clearfix">
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }

  
}
