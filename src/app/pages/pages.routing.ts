import { Routes, RouterModule }  from '@angular/router';
import { Pages } from '../../app/pages/pages.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'instance/:id', loadChildren: './instance/instance.module#InstanceModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
