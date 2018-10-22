
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { InstanceService } from '../../services/instance';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { InstanceComponent } from './instance.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InstanceFileEditorComponent } from './instance-file-editor/instance-file-editor.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { InstanceSnapshotsComponent } from './instance-snapshots/instance-snapshots.component';
import { InstanceJobsComponent } from './instance-jobs/instance-jobs.component';
import { RundeckService } from '../../services/rundeck/rundeck.service';
import { FileDownloaderService } from '../../services/file-downloader/file-downloader.service';
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
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CalendarModule } from 'angular-calendar';
import { InstanceRecoverDialogComponent } from './instance-snapshots/instance-recover-dialog/instance-recover-dialog.component';
import { InstanceBackupDialogComponent } from './instance-snapshots/instance-backup-dialog/instance-backup-dialog.component';
import { InstanceScheduledBackupDialogComponent } from './instance-snapshots/instance-scheduled-backup-dialog/instance-scheduled-backup-dialog.component';
import { InstanceStartStopDialogComponent } from './instance-start-stop-dialog/instance-start-stop-dialog.component';
import { InstanceLoadFileDialogComponent } from './instance-file-editor/instance-load-file-dialog/instance-load-file-dialog.component';
import { InstanceUploadFileDialogComponent } from './instance-file-editor/instance-upload-file-dialog/instance-upload-file-dialog.component';
import { InstanceExpiryDateDialogComponent } from './instance-expiry-date-dialog/instance-expiry-date-dialog.component';

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
    MatIconModule,
    MatMenuModule,
    CalendarModule.forRoot(),
  ],
  declarations: [
    InstanceComponent,
    InstanceDialogComponent,
    InstanceFileEditorComponent,
    MetadataEditorComponent,
    InstanceSnapshotsComponent,
    InstanceJobsComponent,
    InstanceLogsComponent,
    InstanceLogsStatisticsComponent,
    InstanceRecoverDialogComponent,
    InstanceBackupDialogComponent,
    InstanceScheduledBackupDialogComponent,
    InstanceStartStopDialogComponent,
    InstanceLoadFileDialogComponent,
    InstanceUploadFileDialogComponent,
    InstanceExpiryDateDialogComponent,
  ],
  entryComponents: [
    InstanceDialogComponent,
    InstanceRecoverDialogComponent,
    InstanceBackupDialogComponent,
    InstanceScheduledBackupDialogComponent,
    InstanceStartStopDialogComponent,
    InstanceLoadFileDialogComponent,
    InstanceUploadFileDialogComponent,
    InstanceExpiryDateDialogComponent,
  ],
  providers: [
    InstanceService,
    RundeckService,
    FileDownloaderService,
  ],
})

export class InstanceModule {}
