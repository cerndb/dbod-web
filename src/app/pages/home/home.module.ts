import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { AppTranslationModule } from '../../app.translation.module';
import { ThemeModule } from '../../@theme/theme.module';
import { Home } from './home.component';
import { routing } from './home.routing';
import { AuthenticationService } from '../../services/authentication';
import { RouterModule } from '@angular/router';
import { StateButtonComponent } from "../components/state-button/state-button.component";
import { DbNameComponent } from "../components/db-name/db-name.component";
import { JobService } from "../../services/job";
import { InstancesComponent } from "./instances/instances.component";
import { JobsComponent } from "./jobs/jobs.component";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    //AppTranslationModule,
    Ng2SmartTableModule,
    ThemeModule,
    routing,
  ],
  declarations: [
    Home,
    InstancesComponent,
    JobsComponent,
    StateButtonComponent,
    DbNameComponent,
  ],
  providers: [
    AuthenticationService,
    JobService,
  ],
  entryComponents: [
    StateButtonComponent,
    DbNameComponent],
})
export class HomeModule {}
