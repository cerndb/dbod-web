import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';

// TODO: move layouts into the framework
@Component({
    selector: 'cern-ngx-one-column-layout',
    styleUrls: [ './one-column.layout.scss' ],
    template: `
    <nb-layout>
      <nb-layout-header fixed>
        <cern-ngx-header></cern-ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <nb-sidebar-header *ngIf="currentTheme !== 'corporate'">
          <a href="#" class="btn btn-hero-success main-btn">
            <i class="ion ion-social-github"></i> <span>Support Us</span>
          </a>
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <cern-ngx-footer></cern-ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent implements OnDestroy {
    private alive = true;

    currentTheme: string;

    constructor(protected themeService: NbThemeService) {
        this.themeService.getJsTheme().pipe(takeWhile(() => this.alive)).subscribe((theme) => {
            this.currentTheme = theme.name;
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
