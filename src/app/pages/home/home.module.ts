import { InstancesModule } from './instances/instances.module';
import { JobsModule } from './jobs/jobs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Home } from './home.component';
import { routing } from './home.routing';
import { AuthenticationService } from '../../services/authentication';
import { RouterModule } from '@angular/router';
import { } from './';
import { InstancesComponent } from './instances/instances.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    JobsModule,
    InstancesModule,
  ],
  declarations: [
    Home,
  ],
  providers: [
    AuthenticationService,
  ],
})
export class HomeModule {}