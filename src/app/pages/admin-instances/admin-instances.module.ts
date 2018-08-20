import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminInstancesComponent } from './admin-instances.component';
import { PendingInstancesComponent } from './pending-instances/pending-instances.component';
import { ExpiredInstancesComponent } from './expired-instances/expired-instances.component'
import { InstanceService } from '../../services/instance';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
    CommonModule,
    FormsModule,
    Ng2SmartTableModule,
    ThemeModule,
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
