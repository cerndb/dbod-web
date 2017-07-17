import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Home } from './home.component';
import { routing } from './home.routing';
import { StateButtonComponent } from '../../theme/components/state-button';
import { DbNameComponent } from '../../theme/components/db-name';
import { RouterModule } from '@angular/router';
import { } from './';
import { InstancesComponent } from './instances/instances.component';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
  ],
  declarations: [
    Home,
    InstancesComponent,
    JobsComponent,
  ],
  providers: [
  ],
  entryComponents: [StateButtonComponent, DbNameComponent]
})
export class HomeModule {}
