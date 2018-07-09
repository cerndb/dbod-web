import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstanceComponent } from './pages/instance/instance.component';
import { PlatformOverviewComponent } from './pages/platform-overview/platform-overview.component';


const routes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    { path: 'instance/:id', component: InstanceComponent},
//    { path: 'overview', component: PlatformOverviewComponent},
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
