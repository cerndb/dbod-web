import { Routes, RouterModule }  from '@angular/router';
import { InstanceComponent } from './instance.component';

const routes: Routes = [
  {
    path: '',
    component: InstanceComponent,
    children: [
      //
    ]
  }
];

export const routing = RouterModule.forChild(routes);