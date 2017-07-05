import { Routes, RouterModule }  from '@angular/router';
import { Home } from './home.component';
import { ModuleWithProviders } from '@angular/core';
import { InstanceComponent } from './instance/instance.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      { path: 'instance/:id', component: InstanceComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
