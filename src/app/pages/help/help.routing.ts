import { Routes, RouterModule } from '@angular/router';

import { HelpComponent } from './help.component';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent
  }
];

export const routing = RouterModule.forChild(routes);