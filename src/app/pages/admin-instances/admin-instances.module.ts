import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminInstancesComponent } from './admin-instances.component';
import { PendingInstancesComponent } from './pending-instances/pending-instances.component';
import { ExpiredInstancesComponent } from './expired-instances/expired-instances.component'
import { InstanceService } from '../../services/instance';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    ThemeModule,
  ],
  declarations: [
    AdminInstancesComponent,
    PendingInstancesComponent,
    ExpiredInstancesComponent,
  ],
  providers: [
    InstanceService,
  ],
  entryComponents: [
  ],
})
export class AdminInstancesModule { }
