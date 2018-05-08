import { Routes, RouterModule }  from '@angular/router';
import { PagesComponent } from '../../app/pages/pages.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'ngx-pages',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'instance/:id', loadChildren: './instance/instance.module#InstanceModule' },
      { path: 'help', loadChildren: './help/help.module#HelpModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);