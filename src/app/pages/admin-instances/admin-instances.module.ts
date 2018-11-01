import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminInstancesComponent } from './admin-instances.component';
import { ExpiredPendingComponent } from './expired-pending/expired-pending.component';
import { UpgradesComponent } from './upgrades/upgrades.component'
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
import { MatIconModule } from '@angular/material/icon';
import { ExpiredPendingDialogComponent } from './expired-pending/expired-pending-dialog/expired-pending-dialog.component';

@NgModule({
  imports: [
    CommonModule,
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
    MatIconModule,
  ],
  declarations: [
    AdminInstancesComponent,
    ExpiredPendingComponent,
    UpgradesComponent,
    ExpiredPendingDialogComponent,
  ],
  providers: [
    InstanceService,
  ],
  entryComponents: [
    ExpiredPendingDialogComponent
  ],
})
export class AdminInstancesModule { }
