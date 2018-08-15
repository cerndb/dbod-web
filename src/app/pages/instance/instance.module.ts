
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { InstanceService } from '../../services/instance';
import { JobService } from '../../services/job';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { InstanceComponent } from './instance.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileEditorComponent } from '../components/file-editor/file-editor.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { InstanceSnapshotsComponent } from './instance-snapshots/instance-snapshots.component';
import { InstanceJobsComponent } from './instance-jobs/instance-jobs.component';
import { RundeckService } from '../../services/rundeck/rundeck.service';
import { InstanceLogsComponent } from './instance-logs/instance-logs.component';
import { InstanceLogsStatisticsComponent } from './instance-logs/instance-logs-statistics/instance-logs-statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { ChartsModule } from 'ng2-charts';
import { MatSliderModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material';
import { InstanceDialogComponent } from './instance-dialog/instance-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CalendarModule } from 'angular-calendar';
import { InstanceRecoverDialogComponent } from './instance-snapshots/instance-recover-dialog/instance-recover-dialog.component';
import { InstanceBackupDialogComponent } from './instance-snapshots/instance-backup-dialog/instance-backup-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    InlineEditorModule,
    NgJsonEditorModule,
    UiSwitchModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    PrettyJsonModule,
    ChartsModule,
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
    MatButtonToggleModule,
    CalendarModule.forRoot(),
  ],
  declarations: [
    InstanceComponent,
    InstanceDialogComponent,
    FileEditorComponent,
    MetadataEditorComponent,
    InstanceSnapshotsComponent,
    InstanceJobsComponent,
    InstanceLogsComponent,
    InstanceLogsStatisticsComponent,
    InstanceRecoverDialogComponent,
    InstanceBackupDialogComponent,
  ],
  entryComponents: [
    InstanceDialogComponent,
    InstanceRecoverDialogComponent,
    InstanceBackupDialogComponent,
  ],
  providers: [
    InstanceService,
    JobService,
    RundeckService,
  ],
})

export class InstanceModule {}
