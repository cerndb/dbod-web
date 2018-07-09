
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
import { InstanceRecoverComponent } from './instance-recover/instance-recover.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { InstanceJobsComponent } from './instance-jobs/instance-jobs.component';
import { InstanceBackupsComponent } from './instance-backups/instance-backups.component';
import { InstanceRecoverService } from '../../services/instance/instance-recover.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    InlineEditorModule,
    NgJsonEditorModule,
    UiSwitchModule,
    FullCalendarModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    InstanceComponent,
    FileEditorComponent,
    MetadataEditorComponent,
    InstanceRecoverComponent,
    InstanceJobsComponent,
    InstanceBackupsComponent,
  ],
  providers: [
    InstanceService,
    JobService,
    InstanceRecoverService,
  ],
})
export class InstanceModule {}
