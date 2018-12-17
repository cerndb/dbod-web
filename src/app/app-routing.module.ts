import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstanceComponent } from './pages/instance/instance.component';

const routes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    { path: 'pages/instance/:id', component: InstanceComponent},
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [ RouterModule.forRoot(routes, config) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
