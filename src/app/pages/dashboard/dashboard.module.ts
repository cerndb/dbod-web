import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationService } from '../../services/authentication';
import { JobService } from '../../services/job';
import { InstancesComponent } from './instances/instances.component';
import { JobsComponent } from './jobs/jobs.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    InstancesComponent,
    JobsComponent,
  ],
  providers: [
    AuthenticationService,
    JobService,
  ],
  entryComponents: [
  ],
})
export class DashboardModule {}
