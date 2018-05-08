import { Routes, RouterModule } from '@angular/router';
import { Home } from './home.component';
import { ModuleWithProviders } from '@angular/core';
import { InstanceComponent } from '../instance/instance.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
