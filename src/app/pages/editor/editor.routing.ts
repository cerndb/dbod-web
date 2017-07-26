import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

export const routing = RouterModule.forChild(routes);