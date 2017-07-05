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
import { InstanceComponent } from './instance';

import { } from './';
import { InstancesViewComponent } from './instances-view/instances-view.component';
import { JobsViewComponent } from './jobs-view/jobs-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
  ],
  declarations: [
    Home,
    InstancesViewComponent,
    JobsViewComponent,
    InstanceComponent,
  ],
  providers: [
  ],
  entryComponents: [StateButtonComponent, DbNameComponent]
})
export class HomeModule {}
