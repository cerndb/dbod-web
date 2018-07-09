import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';

import { InstanceComponent } from './instance/instance.component';

const routes: Routes = [
  {
    path: '',  component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'instance/:id', component: InstanceComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'pages' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
