import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {HomeComponent} from "./pages/home/home.component";
import {HelpComponent} from "./pages/help/help.component";
import {InstanceComponent} from "./pages/instance/instance.component";
import { PlatformOverviewComponent } from './pages/platform-overview/platform-overview.component';

const routes: Routes = [
  // { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'instance/:id',
    component: InstanceComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'platform-overview',
    component: PlatformOverviewComponent,
  },
  /*{
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },*/
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
