import { NgModule } from '@angular/core';
import { AdminInstancesComponent } from './admin-instances.component';
import { PendingInstancesComponent } from './pending-instances/pending-instances.component';
import { ExpiredInstancesComponent } from './expired-instances/expired-instances.component'
import { InstanceService } from '../../services/instance';

import { MatSliderModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    MatSliderModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
