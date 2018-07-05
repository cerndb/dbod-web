
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
import { FileEditorComponent } from '../components/file-editor/file-editor.component';
import { MetadataEditorComponent } from './metadata-editor/metadata-editor.component';
import { InstanceRecoverComponent } from './instance-recover/instance-recover.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { InstanceJobsComponent } from './instance-jobs/instance-jobs.component';
import { InstanceBackupsComponent } from './instance-backups/instance-backups.component';
import { InstanceRecoverService } from '../../services/instance/instance-recover.service';
import { InstanceLogsComponent } from './instance-logs/instance-logs.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LogService } from '../../services/log';
import {PrettyJsonModule} from 'angular2-prettyjson';

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
    NgbModule.forRoot(),
    PrettyJsonModule,
  ],
  declarations: [
    InstanceComponent,
    FileEditorComponent,
    MetadataEditorComponent,
    InstanceRecoverComponent,
    InstanceJobsComponent,
    InstanceBackupsComponent,
    InstanceLogsComponent,
  ],
  providers: [
    InstanceService,
    InstanceRecoverService,
    LogService
  ]
})
export class InstanceModule {}
