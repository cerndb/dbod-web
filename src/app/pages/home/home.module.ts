import { InstancesModule } from './instances/instances.module';
import { JobsModule } from './jobs/jobs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { AppTranslationModule } from '../../app.translation.module';
import { ThemeModule } from '../../@theme/theme.module';
import { Home } from './home.component';
import { routing } from './home.routing';
import { AuthenticationService } from '../../services/authentication';
import { RouterModule } from '@angular/router';
import {StateButtonComponent} from "../components/state-button/state-button.component";
import {DbNameComponent} from "../components/db-name/db-name.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    //AppTranslationModule,
    ThemeModule,
    routing,
    JobsModule,
    InstancesModule,
  ],
  declarations: [
    Home,
    StateButtonComponent,
    DbNameComponent,
  ],
  providers: [
    AuthenticationService,
  ],
})
export class HomeModule {}
